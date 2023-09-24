"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Task } from '../../types/Board';
import EditTask from '../task/EditTask'
import DeleteTask from '../task/DeleteTask';
import { on } from 'events';

interface ModalMenuProps {
    onClose: () => void;
    task: Task;
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    actionType: string;
}

const ModalMenu: React.FC<ModalMenuProps> = ({onClose, task, onStatusChange, actionType}) => {
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);

    useEffect(() => {
        console.log(onClose);
    }, [onClose]);

    const handleEditTaskClick = useCallback(() => {
        setEditTaskOpen(prevState => !prevState);
    }, []);

    const handleDeleteTaskClick = useCallback(() => {
        setDeleteTaskOpen(prevState => !prevState);
    }, []);

    return (
        <section className="absolute bg-white flex flex-col p-4 items-start justify-center top-20 right-10 gap-4 rounded-lg" onClick={e => e.stopPropagation()}>
            <a className="text-sm text-blue-grayish" onClick={handleEditTaskClick}>Edit {actionType}</a>
            <a className="text-sm text-red-bright" onClick={handleDeleteTaskClick}>Delete {actionType}</a>

            {editTaskOpen && <EditTask onClose={() => { handleEditTaskClick();}} task={task} onStatusChange={onStatusChange} />}
            {deleteTaskOpen && <DeleteTask onClose={() => { handleDeleteTaskClick();  }}  parentClose={onClose} task={task}/>}
        </section>
    );
}

export default ModalMenu;
