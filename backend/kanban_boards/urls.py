from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BoardViewSet, ColumnViewSet, TaskViewSet, SubtaskViewSet

router = DefaultRouter()
router.register(r'boards', BoardViewSet)
router.register(r'tasks', TaskViewSet)

board_columns = [
    path('boards/<int:board_id>/columns/',
         ColumnViewSet.as_view({'get': 'list', 'post': 'create'}), name='board-columns'),
    path('boards/<int:board_id>/columns/<int:pk>/', ColumnViewSet.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='board-column-detail'),
    path('boards/<int:board_id>/columns/<int:column_id>/tasks/',
         TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='column-tasks'),
    path('boards/<int:board_id>/columns/<int:column_id>/tasks/<int:pk>/', TaskViewSet.as_view(
        {'patch': 'partial_update', 'put': 'update', 'delete': 'destroy', 'get': 'retrieve'}), name='task-detail'),
    path('boards/<int:board_id>/columns/<int:column_id>/tasks/<int:task_id>/subtasks/',
         SubtaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='subtask-list'),
     path('boards/<int:board_id>/columns/<int:column_id>/tasks/<int:task_id>/subtasks/<int:pk>/', SubtaskViewSet.as_view({'patch': 'partial_update', 'get': 'retrieve'}), name='subtask-detail'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('', include(board_columns)),
]
