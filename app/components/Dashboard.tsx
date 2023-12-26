"use client";

import { useContext, useMemo, useCallback, useEffect } from 'react';
import { BoardContext } from "./context/BoardContext";
import Image from 'next/image';
import { ButtonPrimary } from "./buttons/ButtonPrimary";
import { useState } from "react";
import {Task} from "../types/Board";
import TaskDetails from './task/TaskDetails';
import useColumnIcons from '../hooks/columnIcons';
import useTaskOperations from '../hooks/taskOperations';
import TaskColumn from './dashboard/TaskColumn';
import { BoardsContext } from './context/BoardsContext';
import CreateTask from './task/CreateTask';
import ModalMenu from './menus/ModalMenu';
import EditBoard from './board/EditBoard';

const Dashboard = () => {
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);
    const {boards} = useContext(BoardsContext);
    const [taskOpen, setTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name)));
    const currentBoardWithIcons = useColumnIcons(currentBoard && currentBoard.columns ? currentBoard : null);

    const [addTaskClicked, setAddTaskClicked] = useState(false);
    const [modalMenuClicked, setModalMenuClicked] = useState(false);
    const [addColumn, setAddColumn] = useState(false);
    

    console.log(currentBoardWithIcons)
    const { openTask, handleStatusChange, toggleSubtaskCompleted } = useTaskOperations({
        currentBoard,
        setCurrentBoard,
        selectedTask,
        setSelectedTask,
        setTaskOpen
    });

        return (
            <main className='dark:bg-blue-gray min-h-screen overflow-y-hidden  z-0 lg:w-full lg:col-span-2 '>
                <div className=" hidden lg:flex lg:p-4 lg:justify-between lg:items-start lg:w-full lg:z-50 lg:sticky lg:left-0">
                    <h1 className='text-4xl font-bold text-blue-dark dark:text-white'>{currentBoardWithIcons.name}</h1>
                    <div className='flex gap-4'>
                    <ButtonPrimary onClick={() => setAddTaskClicked(prevState => !prevState)}>Add new Task</ButtonPrimary>
                    <button onClick={() => setModalMenuClicked(prevState => !prevState)}><Image src="/assets/icon-vertical-ellipsis.svg" alt="More Info" width={10} height={10} /> </button>
                    </div>
                </div>

                {addTaskClicked && (
                    <CreateTask onClose={() => setAddTaskClicked(false)} statuses={statuses}/>
                    
                )}

                {modalMenuClicked && (
                    <ModalMenu actionType='Board'/>
                )}

                {addColumn && (
                    <EditBoard onClose={() => setAddColumn(false)}/>

                )}
                



                {taskOpen && selectedTask && <TaskDetails 
                    title={selectedTask.title} 
                    statuses={statuses}
                    onStatusChange={handleStatusChange}
                    toggleSubtaskCompleted={toggleSubtaskCompleted}
                    onClose={() => setTaskOpen(false)}
                /> }

                <section className=' overflow-y-visible grid place-items-start grid-cols-auto grid-rows-1 grid-flow-col p-4 w-[120rem] min-h-screen lg:w-[150rem] 2xl:min-w-[200rem] bg-blue-pale dark:bg-blue-dark z-0 lg:gap-10'>
                    {currentBoardWithIcons?.columns?.map((column, index) => (
                        <TaskColumn key={index} column={column} openTask={openTask}/>
                    ))}

                    <button className=' hidden lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4 lg:w-full lg:min-h-full lg:text-purple-dark lg:font-xl lg:font-bold lg:text-2xl lg:hover:bg-purple-light lg:hover:bg-opacity-20' onClick={() => setAddColumn(prevState => !prevState)}>New Column +</button>
                </section>

                

            </main>
        );
    } 


export default Dashboard;
