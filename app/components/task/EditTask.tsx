import React from 'react';
import { Task, } from '../../types/Board';
import TaskForm from '../forms/TaskForm';
import { reducer } from './CreateTask';
import { useContext, useMemo, useCallback } from 'react';
import { BoardContext } from '../context/BoardContext';


interface EditTaskProps {
    onClose: () => void;
    task: Task;
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ onClose, task, onStatusChange}) => {
    const [state, dispatch] = React.useReducer(reducer, task);
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));


    const currentColumnIndex = useMemo(() => {
        if (!currentBoard) {
          return -1;
        }
      
        return currentBoard.columns.findIndex(column =>
          column.tasks?.findIndex(t => t.id === task.id) !== -1
        );
      }, [currentBoard, task]);
      
      const currentTaskIndex = useMemo(() => {
        if (currentColumnIndex === -1) {
          return -1;
        }
      
        return currentBoard?.columns[currentColumnIndex].tasks?.findIndex(t => t.id === task.id);
      }, [currentBoard, currentColumnIndex, task]);

      
      const editTaskApi = async (boardId: number, columnId: number, taskId: number, updatedTask: Task) => {
        try {

            const subtasksWithTaskId = updatedTask.subtasks?.map(subtask => ({
              ...subtask,
              task: taskId              
            }));

            const taskData = { ...updatedTask, subtasks: subtasksWithTaskId };
            console.log(taskData);

            const response = await fetch(`api/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`API error: ${errorResponse.message || 'Failed to update the task'}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    };

 

  const editTask = useCallback(async (updatedTask: Task) => {
    if (currentBoard && currentColumnIndex !== -1 && currentTaskIndex !== -1) {
        try {
            // Await the completion of the task update API call
            const updatedTaskResponse = await editTaskApi(currentBoard.id, updatedTask.columnId, updatedTask.id, updatedTask);
            console.log(updatedTaskResponse);

            // Update the local state with the response from the server
            const updatedBoard = { ...currentBoard };

            // Update or move the task based on its updated status
            if (task.status !== updatedTaskResponse.status) {
                // Remove the task from its current position
                updatedBoard.columns[currentColumnIndex].tasks?.splice(currentTaskIndex ?? -1, 1);
                // Find the new column index and add the updated task
                const newColumnIndex = updatedBoard.columns.findIndex(column => column.name === updatedTaskResponse.status);
                updatedBoard.columns[newColumnIndex].tasks?.push(updatedTaskResponse);
            } else {
                // Update the task in its current position
                if (updatedBoard.columns[currentColumnIndex].tasks) {
                    updatedBoard.columns[currentColumnIndex].tasks?.push(updatedTaskResponse);
                }
            }

            setCurrentBoard(updatedBoard);
            onClose();
        } catch (error) {
            console.error('Error while updating task:', error);
            // Optionally, show error message to the user
        }
    }
}, [currentBoard, currentColumnIndex, currentTaskIndex, task, setCurrentBoard, onClose]);

    
    

    
    return (
        <section className="fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <TaskForm 
                state={state}
                dispatch={dispatch}
                statuses={statuses}
                onSubmit={(e) => {
                    e.preventDefault();
                    editTask(state);
                } }
                title="Edit Task"
                onStatusChange={onStatusChange} columns={currentBoard!.columns}          />
        </section>
    )
}

export default EditTask;
