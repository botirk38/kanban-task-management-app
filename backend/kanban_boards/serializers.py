from rest_framework import serializers
from .models import Board, Column, Task, Subtask
import logging
logger = logging.getLogger(__name__)


class SubtaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Subtask
        fields = ['id', 'title', 'is_completed', 'task']


class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, required=False)
    columnId = serializers.ReadOnlyField(source='column.id')

    class Meta:
        model = Task
        fields = ['id', 'title', 'description',
                  'subtasks', 'status', 'columnId']

    def _set_column_from_status(self, task, status_name):
        try:
            column = Column.objects.get(name=status_name)
            task.column = column
            task.status = status_name
        except Column.DoesNotExist:
            raise serializers.ValidationError(
                {'status': 'Invalid status name, no corresponding column found'})

    def create(self, validated_data):
        subtasks_data = validated_data.pop('subtasks', [])
        status_name = validated_data.pop('status', None)

        task = Task(**validated_data)
        if status_name:
            self._set_column_from_status(task, status_name)
        task.save()

        for subtask_data in subtasks_data:
            Subtask.objects.create(task=task, **subtask_data)
        return task

    def update(self, instance, validated_data):

        status_name = validated_data.get('status')

        if status_name and status_name != instance.status:
            self._set_column_from_status(instance, status_name)

        # Pop subtasks data from validated_data
        subtasks_data = validated_data.pop('subtasks', [])
        instance = super(TaskSerializer, self).update(instance, validated_data)

        for subtask_data in subtasks_data:
            subtask_id = subtask_data.get('id', None)

            if subtask_id:
                # Update existing subtask
                subtask_instance = Subtask.objects.get(
                    id=subtask_id, task=instance)
                # Update fields in subtask_instance from subtask_data
                # ...
                subtask_instance.save()
            else:
                # Create new subtask - Ensure 'task' is not included in subtask_data
                if 'task' in subtask_data:
                    subtask_data.pop('task')
                Subtask.objects.create(task=instance, **subtask_data)

        return instance


class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Column
        fields = ['id', 'name', 'tasks']

    def create(self, validated_data):
        tasks_data = validated_data.pop('tasks', [])
        column = Column.objects.create(**validated_data)
        for task_data in tasks_data:
            Task.objects.create(column=column, **task_data)
        return column

    def update(self, instance, validated_data):
        tasks_data = validated_data.pop('tasks', [])

        # Update the column instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update or create tasks
        for task_data in tasks_data:
            task_id = task_data.get('id')
            if task_id:
                task, _ = Task.objects.update_or_create(
                    id=task_id, column=instance,
                    defaults=task_data
                )
            else:
                Task.objects.create(column=instance, **task_data)

        return instance


class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, required=False)
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Board
        fields = ['id', 'name', 'user', 'columns']
        read_only_fields = ('user', )

    def create(self, validated_data):
        columns_data = validated_data.pop('columns', [])
        board = Board.objects.create(**validated_data)

        for column_data in columns_data:
            Column.objects.create(board=board, **column_data)

        return board

    def update(self, instance, validated_data):
        columns_data = validated_data.pop('columns', [])
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        # Process each column
        for column_data in columns_data:
            column_id = column_data.get('id')
            if column_id:
                # Only update if an ID is present
                column_instance = Column.objects.filter(
                    id=column_id, board=instance).first()
                if column_instance:
                    ColumnSerializer().update(column_instance, column_data)

            else:
                column_name = column_data.get('name')
                if column_name:
                    Column.objects.create(board=instance, name=column_name)

        return instance
