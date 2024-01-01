import React, { useContext } from 'react';
import { ButtonAddTask } from '../buttons/ButtonAddTask';
import ButtonDanger from '../buttons/ButtonDanger';
import { BoardContext } from '../context/BoardContext';
import { Task } from '../../types/Board';

interface DeleteTaskProps{
    onClose: () => void;
    parentClose: () => void;
    task: Task;
}

const deleteTaskAPI = async (taskID : number, boardID : number, columnID : number) => {
    try {
        const response = await fetch(`api/boards/${boardID}/columns/${columnID}/tasks/${taskID}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('Error response:', errorResponse);
            throw new Error('Failed to delete the task');
        }

        

    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}


const DeleteTask: React.FC<DeleteTaskProps> = ({onClose, parentClose, task}) =>{

    const {currentBoard, setCurrentBoard} = useContext(BoardContext);

    const handleCancelClick = () =>{
        onClose();
    }

    const handleDeleteTask = async () => {
        if (currentBoard && task) {
            try {
                console.log(task)
                await deleteTaskAPI(task.id, currentBoard.id, task.columnId);
                const updatedBoard = { ...currentBoard };
                const colIndex = updatedBoard.columns.findIndex(column => column.id === task.columnId);
                if (colIndex > -1) {
                    const taskIndex = updatedBoard.columns[colIndex].tasks?.findIndex(t => t.id === task.id);
                    if (taskIndex && taskIndex > -1) {
                        updatedBoard.columns[colIndex].tasks?.splice(taskIndex, 1);
                        setCurrentBoard(updatedBoard);
                    }
                }
                parentClose();
            } catch (error) {
                console.error("Error while deleting task:", error);
                // Optionally, handle UI feedback for the error
            }
        } else {
            console.error("No current board or task");
        }
    }



    
    
    return(
        <section className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
            <div className="flex flex-col dark:bg-blue-mid bg-white gap-4 rounded max-h-[calc(100vh-2rem)] overflow-y-auto p-8 w-[23rem]" onClick={e => e.stopPropagation()}>
                <h1 className='text-lg text-red-bright font-bold'>Delete this Task ?</h1>
                <p className='text-blue-grayish'>Are you sure you want to delete the &apos;{task.title}&apos;
                    ? This action cannot be reversed.
                </p>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <ButtonDanger className='text-white tracking-wide' onClick={handleDeleteTask}> Delete </ButtonDanger>
                    <ButtonAddTask className='bg-opacity-10 text-purple-dark' onClick={handleCancelClick}>Cancel</ButtonAddTask>
                </div>
            </div>
        </section>
    )
}

export default DeleteTask;
