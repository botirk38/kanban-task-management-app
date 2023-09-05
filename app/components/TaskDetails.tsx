import React from 'react';
import { Subtask } from "../types/Board";
import Image from 'next/image';


interface TaskDetailsProps {
    
    title: string;
    description: string;
    subtasks: Subtask[];
    status: string;
    statuses: string[];
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    toggleSubtaskCompleted: (index: number) => void;
    onClose: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ title, description, subtasks, status, statuses, onStatusChange, toggleSubtaskCompleted, onClose }) => {


    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
            <div className=" dark:bg-blue-mid bg-white rounded p-8 min-h-max w-[23rem]" onClick={(e) => e.stopPropagation()}>
                <div className='flex justify-between items-center mb-4 '>
                    <h2 className='font-bold text-lg dark:text-white'>{title}</h2>
                    <picture>
                        <Image src="/assets/icon-vertical-ellipsis.svg" alt="Edit Icon" width={5} height={5} />
                    </picture>
                </div>
                <p className='text-blue-gray-light mb-4 dark:text-blue-grayish '>{description}</p>
                <h3 className='text-blue-gray-light mb-2 font-bold dark:text-white'>Subtasks ({subtasks.filter(st => st.isCompleted === true).length} of {subtasks.length})</h3>

                <ul>
                    {subtasks.map((subtask, index) => (
                        <div key={index} className=' dark:bg-blue-dark flex justify-start items-center gap-4 mb-4 bg-blue-pale p-5 rounded-lg'>
                            <input 
                                className={`appearance-none bg-white  p-3 relative ${subtask.isCompleted ? "bg-purple-dark after:bg-[url('/assets/icon-check.svg')]  after:bg-no-repeat after:absolute after:w-4 after:h-4 bg-center after:top-[0.35rem] after:bg-contain after:left-1 " : ''}`} 
                                type='checkbox' 
                                checked={subtask.isCompleted} 
                                onChange={() => toggleSubtaskCompleted(index)}
                            />
                            <li className={`text-blue-dark font-bold dark:text-white text-md ${subtask.isCompleted ? "line-through text-blue-gray-light dark:text-blue-grayish" : ""}`}>{subtask.title}</li>
                        </div>
                    ))}
                </ul>
                <h3 className='dark:text-white mb-2'> Current Status</h3>
                <select className="border w-full border-gray-300 rounded p-3 dark:bg-blue-mid dark:text-white" value={status} onChange={onStatusChange} >
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TaskDetails;
