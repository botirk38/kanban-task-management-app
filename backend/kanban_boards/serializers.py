from rest_framework import serializers
from .models import Board, Column, Task, Subtask

class SubtaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)  

    class Meta:
        model = Subtask
        fields = ['id', 'title', 'is_completed', 'task']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, required=False)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'subtasks', 'status']

    def _set_column_from_status(self, task, status_name):
        try:
            column = Column.objects.get(name=status_name)
            task.column = column
            task.status = status_name
        except Column.DoesNotExist:
            raise serializers.ValidationError({'status': 'Invalid status name, no corresponding column found'})

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
        subtasks_data = validated_data.pop('subtasks', [])
        status_name = validated_data.pop('status', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if status_name:
            self._set_column_from_status(instance, status_name)
        instance.save()

        for subtask_data in subtasks_data:
            subtask_id = subtask_data.get('id', None)
            if subtask_id:
                subtask_instance = Subtask.objects.get(id=subtask_id, task=instance)
                for subtask_attr, subtask_value in subtask_data.items():
                    setattr(subtask_instance, subtask_attr, subtask_value)
                subtask_instance.save()
            else:
                Subtask.objects.create(task=instance, **subtask_data)

        return instance

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = ['id', 'name', 'tasks']

class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, required=False)
    class Meta:
        model = Board
        fields = ['id', 'name', 'user', 'columns']
        read_only_fields = ('user', 'id')

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

        # Keep track of column IDs to identify which columns to delete
        existing_column_ids = set(instance.columns.values_list('id', flat=True))

        for column_data in columns_data:
            column_id = column_data.get('id')
            if column_id and column_id in existing_column_ids:
                column_instance = Column.objects.get(id=column_id)
                for key, value in column_data.items():
                    setattr(column_instance, key, value)
                column_instance.save()
                existing_column_ids.remove(column_id)
            elif column_id is None:
                Column.objects.create(board=instance, **column_data)

        # Delete columns that were not included in the updated data
        Column.objects.filter(board=instance, id__in=existing_column_ids).delete()

        return instance


    
