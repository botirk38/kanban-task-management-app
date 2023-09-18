import React from 'react';
import { Task, } from '../../types/Board';
import TaskForm from '../forms/TaskForm';
import { reducer } from './CreateTask';
import { useContext, useMemo, useCallback } from 'react';
import { BoardContext } from '../context/BoardContext';


interface EditTaskProps {
    onClose: () => void;
    task: Task;
    statuses: string[];
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ onClose, task, statuses, onStatusChange}) => {
    const [state, dispatch] = React.useReducer(reducer, task);
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);

    const currentColumnIndex = useMemo(() => {
        if (!currentBoard) {
          return -1;
        }
      
        return currentBoard.columns.findIndex(column =>
          column.tasks.findIndex(t => t.title === task.title) !== -1
        );
      }, [currentBoard, task]);
      
      const currentTaskIndex = useMemo(() => {
        if (currentColumnIndex === -1) {
          return -1;
        }
      
        return currentBoard?.columns[currentColumnIndex].tasks.findIndex(t => t.title === task.title);
      }, [currentBoard, currentColumnIndex, task]);


      const editTask = useCallback((updatedTask: Task) => {
        if (currentBoard && currentColumnIndex !== -1 && currentTaskIndex !== -1) {
          const updatedBoard = { ...currentBoard };
      
          // If the task's status has changed, move it to the appropriate column
          if (task.status !== updatedTask.status) {
            // Remove the task from its current position
            updatedBoard.columns[currentColumnIndex].tasks.splice(currentTaskIndex ?? - 1, 1, updatedTask);
      
            // Find the column index where the task should be placed after the update
            const newColumnIndex = updatedBoard.columns.findIndex(column => column.name === updatedTask.status);
      
            // Add the task to the new column
            updatedBoard.columns[newColumnIndex].tasks.push(updatedTask);
          } else {
            // Update the task in its current position
            updatedBoard.columns[currentColumnIndex].tasks[currentTaskIndex ?? - 1] = updatedTask;
          }
      
          setCurrentBoard(updatedBoard);
          onClose();
        }
      }, [currentBoard, currentColumnIndex, currentTaskIndex, task, setCurrentBoard, onClose]);
    
    

    
    return (
        <section className="fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <TaskForm 
                state={state} 
                dispatch={dispatch} 
                statuses={statuses} 
                onSubmit={
                (e) => {
                    e.preventDefault();
                    editTask(state);
                }} 
                title="Edit Task"
                onStatusChange={onStatusChange}
            />
        </section>
    )
}

export default EditTask;
