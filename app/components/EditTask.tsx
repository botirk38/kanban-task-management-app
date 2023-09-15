import React from 'react';
import { Task, } from '../types/Board';
import TaskForm from './TaskForm';
import { reducer } from './CreateTask';
import { useContext } from 'react';
import { BoardContext } from './context/BoardContext';


interface EditTaskProps {
    onClose: () => void;
    task: Task;
    statuses: string[];
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ onClose, task, statuses, onStatusChange}) => {
    const [state, dispatch] = React.useReducer(reducer, task);
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);

    const editTask = (updatedTask: Task) => {
        if (currentBoard) {
            const updatedBoard = { ...currentBoard };
            
            // Find the column index where the task currently resides
            console.log(updatedBoard.columns)
            const currentColumnIndex = updatedBoard.columns.findIndex(column =>
                column.tasks.findIndex(t => t.title === task.title) !== -1
            );
            console.log(currentColumnIndex);
            
            // Find the task index within that column
            if(currentColumnIndex === -1) return;
            const currentTaskIndex = updatedBoard.columns[currentColumnIndex].tasks.findIndex(t => t.title === task.title);
            console.log(updatedBoard.columns[currentColumnIndex].tasks[currentTaskIndex]);
    
            // If the task's status has changed, move it to the appropriate column
            if (task.status !== updatedTask.status) {
                // Remove the task from its current position
                updatedBoard.columns[currentColumnIndex].tasks.splice(currentTaskIndex, 1);
    
                // Find the column index where the task should be placed after the update
                const targetColumnIndex = updatedBoard.columns.findIndex(column => column.name === updatedTask.status);
    
                // Add the updated task to its new position
                updatedBoard.columns[targetColumnIndex].tasks.push(updatedTask);
            } else {
                // If the status hasn't changed, just update the task in its current position
                updatedBoard.columns[currentColumnIndex].tasks[currentTaskIndex] = updatedTask;
            }
            
            setCurrentBoard(updatedBoard);
            onClose();
        }
    }
    
    

    
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
