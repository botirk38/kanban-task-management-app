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

const Dashboard = () => {
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);
    const {boards} = useContext(BoardsContext);
    const [taskOpen, setTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));
    const currentBoardWithIcons = useColumnIcons(currentBoard || boards[0]);
    const { openTask, handleStatusChange, toggleSubtaskCompleted } = useTaskOperations({
        currentBoard,
        setCurrentBoard,
        selectedTask,
        setSelectedTask,
        setTaskOpen
    });

        return (
            <main className='min-h-screen overflow-y-hidden'>
                <div className="hidden">
                    <h1>{currentBoard?.name}</h1>
                <div>
                    <ButtonPrimary>Add new Task</ButtonPrimary>
                    <button><Image src="/assets/icon-vertical-ellipsis.svg" alt="More Info" width={10} height={10} /> </button>
                    </div>
                </div>


                {taskOpen && selectedTask && <TaskDetails 
                    title={selectedTask.title} 
                    statuses={statuses}
                    onStatusChange={handleStatusChange}
                    toggleSubtaskCompleted={toggleSubtaskCompleted}
                    onClose={() => setTaskOpen(false)}
                /> }

                <section className=' relative grid place-items-start grid-cols-3 grid-rows-auto  p-4 w-[73rem] min-h-screen  bg-blue-pale dark:bg-blue-dark md:w-full'>
                    {currentBoardWithIcons.columns && currentBoardWithIcons.columns.map((column, index) => (
                        <TaskColumn key={index} column={column} openTask={openTask}/>
                    ))}
                </section>
            </main>
        );
    } 


export default Dashboard;
