import React from 'react';
import {Column, Task} from '../../types/Board';

interface TaskColumnProps {
    column: Column;
    openTask: (task: Task) => void;
}


const TaskColumn: React.FC<TaskColumnProps> = ({column, openTask}) => {
    return(
    <div className='flex flex-col justify-center items-start gap-4 w-full'>
        <span className='flex'>
            {column.status?.icon && (
                <span className=' mr-4'>
                    {column.status.icon}
                </span>
            )}
            <h2 className='font-bold tracking-widest uppercase text-blue-gray-light'>
                {column.name} ({column.tasks.length})
            </h2>
        </span>
        {column.tasks.map((task, taskIndex) => (
            <button onClick={() => openTask(task)} key={taskIndex} className='bg-white dark:bg-blue-gray w-[22rem] shadow-xl rounded-lg p-4 flex flex-col justify-start items-start text-start gap-1'>
                <h3 className='text-blue-dark font-bold text-lg dark:text-white'>{task.title}</h3>
                <p className='text-blue-gray-light font-bold text-sm dark:text-blue-grayish'>{task.subtasks.filter(st => st.isCompleted === false).length} of {task.subtasks.length} subtasks</p>
            </button>
        ))}
    </div>
    )

}

export default TaskColumn;