"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Task } from '../../types/Board';

import EditTask from '../task/EditTask';
import DeleteTask from '../task/DeleteTask';

import EditBoard from '../board/EditBoard';
import DeleteBoard from '../board/DeleteBoard';

interface EditTaskProps {
    onClose: () => void;
    task: Task;
    onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    actionType: 'Task';
}

interface EditBoardProps {
    actionType: 'Board';
}

type ModalMenuProps = EditTaskProps | EditBoardProps;

const ModalMenu: React.FC<ModalMenuProps> = (props) => {
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);


    const handleEditTaskClick = useCallback(() => {
        setEditTaskOpen(prevState => !prevState);
    }, []);

    const handleDeleteTaskClick = useCallback(() => {
        setDeleteTaskOpen(prevState => !prevState);
    }, []);

    return (
        <section className={` absolute bg-white flex z-50 flex-col p-4 items-start justify-center  gap-4 rounded-lg ${ props.actionType === "Task" ? "top-20 right-10" : "top-14 right-10"}`} onClick={e => e.stopPropagation()}>
            <a className="text-sm text-blue-grayish" onClick={handleEditTaskClick}>Edit {props.actionType}</a>
            <a className="text-sm text-red-bright" onClick={handleDeleteTaskClick}>Delete {props.actionType}</a>

            {props.actionType === 'Task' && editTaskOpen && <EditTask onClose={handleEditTaskClick} task={props.task} onStatusChange={props.onStatusChange} />}
            {props.actionType === 'Task' && deleteTaskOpen && <DeleteTask onClose={handleDeleteTaskClick} parentClose={props.onClose} task={props.task} />}

            {props.actionType === 'Board' && editTaskOpen &&  <EditBoard onClose={handleEditTaskClick}/>}
            {props.actionType === 'Board' && deleteTaskOpen && <DeleteBoard onClose={handleDeleteTaskClick}   />}
        </section>
    );
};

export default ModalMenu;
