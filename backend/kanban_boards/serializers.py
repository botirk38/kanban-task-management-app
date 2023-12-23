from rest_framework import serializers
from .models import Board, Column, Task, Subtask

class SubtaskSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)  # Include id for update identification

    class Meta:
        model = Subtask
        fields = ['id', 'title', 'is_completed', 'task']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, required=False)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'subtasks', 'status']

    def create(self, validated_data):
        subtasks_data = validated_data.pop('subtasks', [])
        task = Task.objects.create(**validated_data)
        for subtask_data in subtasks_data:
            Subtask.objects.create(task=task, **subtask_data)
        return task

    def update(self, instance, validated_data):
        subtasks_data = validated_data.pop('subtasks', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
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
    class Meta:
        model = Board
        fields = ['id', 'name', 'user']
        read_only_fields = ('user',)

