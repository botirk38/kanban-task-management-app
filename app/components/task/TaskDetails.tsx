import React, { useEffect } from 'react';
import Image from 'next/image';
import { useCallback, useContext, useMemo, useState } from 'react';
import { BoardContext } from '../context/BoardContext';
import ModalMenu from '../menus/ModalMenu';
import { Board } from '@/app/types/Board';
import { BoardsContext } from '../context/BoardsContext';

interface TaskDetailsProps {
    
    id: string;
    statuses: string[];
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    toggleSubtaskCompleted: (index: number) => void;
    onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ id, statuses, onStatusChange, toggleSubtaskCompleted, onClose}) => {
    
    const {currentBoard, setCurrentBoard} = useContext(BoardContext);
    const {boards} = useContext(BoardsContext);
    const [modalMenuOpen, setModalMenuOpen] = useState(false);

    useEffect(() => {
        if (!currentBoard && boards && boards.length > 0) {
            setCurrentBoard(boards[0]);
        }
        }, [boards, currentBoard, setCurrentBoard]);
    

    const taskFromContext = useMemo(() => {
        for (const column of currentBoard?.columns || boards[0].columns) {
            const task = column.tasks.find(t => t.id === id);
            if (task) return task;
        }
        return null;
    }, [currentBoard, id, boards]);

    const handleModalMenuClick = useCallback(() => {
        setModalMenuOpen(prevState => !prevState);
    }, []);
    
    

   

    return (
        <div className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
            <div className=" dark:bg-blue-mid bg-white rounded h-full p-8 overflow-y-auto max-h-[30rem] w-[23rem]" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-4 '>
                    <h2 className='font-bold text-lg dark:text-white'>{taskFromContext?.title}</h2>
                    <picture>
                        <Image src="/assets/icon-vertical-ellipsis.svg" alt="Edit Icon" width={5} height={5} onClick={handleModalMenuClick}  />
                    </picture>
                </div>
                <p className='text-blue-gray-light mb-4 dark:text-blue-grayish '>{taskFromContext?.description}</p>
                <h3 className='text-blue-gray-light mb-2 font-bold dark:text-white'>Subtasks ({taskFromContext?.subtasks?.filter(st => st.isCompleted === true).length} of {taskFromContext?.subtasks?.length})</h3>

                <ul>
                    {taskFromContext?.subtasks?.map((subtask, index) => (
                        <div key={index} className=' relative dark:bg-blue-dark flex justify-start items-center gap-4 mb-4 bg-blue-pale p-5 rounded-lg'>
                            <input 
                                className={`appearance-none p-3 ${subtask.isCompleted ? "bg-purple-dark" : 'bg-white dark:bg-blue-gray'}`} 
                                type='checkbox' 
                                checked={subtask.isCompleted} 
                                onChange={() => toggleSubtaskCompleted(index)}
                            />
                            {subtask.isCompleted && (
                                <Image src="/assets/icon-check.svg" alt="subtask completed" width={20} height={20} className=' absolute top-1/2 left-70 transform-translate-x-56 -translate-y-1/2 ' onClick={ () => toggleSubtaskCompleted(index)} />
                            )}
                            <li className={`text-blue-dark font-bold dark:text-white text-md ${subtask.isCompleted ? "line-through text-blue-gray-light dark:text-blue-grayish" : ""}`}>{subtask.title}</li>
                        </div>
                    ))}
                </ul>
                <h3 className='dark:text-white mb-2'> Current Status</h3>
                <select className="border w-full border-gray-300 rounded p-3 dark:bg-blue-mid dark:text-white" value={taskFromContext?.status} onChange={onStatusChange} >
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {modalMenuOpen && taskFromContext && 
            <ModalMenu 
            onClose={onClose}  
            task={{title:taskFromContext.title, description: taskFromContext.description, status:taskFromContext.status, subtasks: taskFromContext.subtasks ,id: taskFromContext.id , columnId: taskFromContext.columnId}}  
            onStatusChange={onStatusChange}
            actionType = "Task"
            />}

            
        </div>
    );
};

export default TaskDetails;
