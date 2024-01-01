from rest_framework.permissions import IsAuthenticated
from .serializers import BoardSerializer
from rest_framework import viewsets,  status
from rest_framework.response import Response
from .models import Board, Column, Task, Subtask
from .serializers import BoardSerializer, ColumnSerializer, TaskSerializer, SubtaskSerializer
from rest_framework.exceptions import NotFound
import logging
logger = logging.getLogger(__name__)


logger = logging.getLogger(__name__)


class BoardViewSet(viewsets.ModelViewSet):

    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Board.objects.all().filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            logger.debug(f"Board creation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        logger.info(f"Incoming PATCH data: {request.data}")

        board_instance = self.get_object()
        serializer = self.get_serializer(board_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            logger.error(f"Error deleting board: {e}")
            return Response({"detail": "Error deleting board"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_destroy(self, instance):
        instance.delete()


class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        board_id = self.kwargs.get('board_id')

        if not Board.objects.filter(id=board_id).exists():
            raise NotFound('Board not found')

        return Column.objects.filter(board_id=board_id)

    def create(self, request, *args, **kwargs):
        board_id = self.kwargs.get('board_id')

        try:
            board = Board.objects.filter(id=board_id)

        except Board.DoesNotExist:
            return Response({"detail": "Board not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ColumnSerializer

        if serializer.is_valid():
            serializer.save(board=board)
            headers = self.get_success_headers(serializer.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        column_id = kwargs.get('column_id')
        try:
            column = Column.objects.get(id=column_id)
        except Column.DoesNotExist:
            return Response({'detail': 'Column not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(column=column)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        task = self.get_object()
        column_id = kwargs.get('column_id')

        if column_id:
            try:
                column = Column.objects.get(id=column_id)
                task.column = column
            except Column.DoesNotExist:
                return Response({'detail': 'Column not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(
            task, data=request.data, partial='partial' in request.method)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubtaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer

    def create(self, request, *args, **kwargs):
        subtasks_data = request.data
        if not isinstance(subtasks_data, list):
            return Response({'error': 'Expected a list of subtasks'}, status=status.HTTP_400_BAD_REQUEST)

        created_subtasks = []
        for subtask_data in subtasks_data:
            serializer = self.get_serializer(data=subtask_data)
            if serializer.is_valid():
                serializer.save()
                created_subtasks.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(created_subtasks, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        # Retrieve the subtask being updated
        subtask = self.get_object()

        task_id = kwargs.get('task_id')
        try:
            task = Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return Response({'detail': 'Task not found'}, status=status.HTTP_404_NOT_FOUND)

        # Update the subtask
        serializer = self.get_serializer(subtask, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
