from django.db import models
from django.conf import settings
class Board(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='boards' , on_delete=models.CASCADE )
    
    def __str__(self):
        return self.name

class Column(models.Model):
    name = models.CharField(max_length=50)
    board = models.ForeignKey(Board, related_name='columns', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.ForeignKey(Column, related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Subtask(models.Model):
    title = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    task = models.ForeignKey(Task, related_name='subtasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

