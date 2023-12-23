from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import BoardSerializer
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .models import Board, Column, Task, Subtask
from .serializers import BoardSerializer, ColumnSerializer, TaskSerializer, SubtaskSerializer


class BoardViewSet(viewsets.ModelViewSet):
    
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Board.objects.all().filter(user=self.request.user)
    
    def perform_create(self, serialzer):
        serialzer.save(user = self.request.user)

class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer




