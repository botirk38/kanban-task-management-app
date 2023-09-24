"use client";

import { useContext, useMemo, useCallback } from 'react';
import { BoardContext } from "./context/BoardContext";
import Image from 'next/image';
import { ButtonPrimary } from "./buttons/ButtonPrimary";
import { useState } from "react";
import {Task} from "../types/Board";
import TaskDetails from './task/TaskDetails';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);
    const [taskOpen, setTaskOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
   
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));



      const currentBoardWithIcons = useMemo(() => {

        const todoIcon = <FontAwesomeIcon icon={faCircle} style={{color: "#49c4e5",}} />;
        const doingIcon = <FontAwesomeIcon icon={faCircle} style={{color: "#8471f2",}} />;
        const doneIcon = <FontAwesomeIcon icon={faCircle} style={{color: "#6ee7b7",}} />;

        const columnIcons = [
            { name: statuses[0], icon: todoIcon },
            { name: statuses[1], icon: doingIcon },
            { name: statuses[2], icon: doneIcon }
        ];
       
        return {
          ...currentBoard,
          columns: currentBoard?.columns.map(column => {
            const icon = columnIcons.find(columnIcon => columnIcon.name === column.name)?.icon ?? null;
            return {
              ...column,
              status: {
                name: column.name,
                icon: icon
              }
            };
          })
        };
      }, [currentBoard, statuses]);

            

    const openTask = useCallback((task: Task) => {
        setSelectedTask(task);
        setTaskOpen(true);
    }, []);



    const handleStatusChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        if (currentBoard && selectedTask) {
            const updatedSelectedTask = { ...selectedTask, status: event.target.value };
    
            const oldColumnIndex = currentBoard.columns.findIndex(column => column.tasks.includes(selectedTask));
            
            if (oldColumnIndex !== -1) {
                const updatedBoard = { ...currentBoard };
    
                updatedBoard.columns[oldColumnIndex].tasks = updatedBoard.columns[oldColumnIndex].tasks.filter(task => task !== selectedTask);
    
                const newColumnIndex = currentBoard.columns.findIndex(column => column.name === updatedSelectedTask.status);
                
                if (newColumnIndex !== -1) {
                    // Add task to the new column
                    updatedBoard.columns[newColumnIndex].tasks.push(updatedSelectedTask);

                } else {
                    console.error(`No column found with the name ${updatedSelectedTask.status}`);
                }
    
                setCurrentBoard(updatedBoard);
                setSelectedTask(updatedSelectedTask);
            } else {
                console.error("Selected task not found within the current board.");
            }
        } else {
            console.error("No task selected or no current board.");
        }
    },[currentBoard, selectedTask, setCurrentBoard]);
    

    const toggleSubtaskCompleted = useCallback((subtaskIndex: number) => {
        if (currentBoard && selectedTask && selectedTask.subtasks[subtaskIndex]) {
          const updatedSelectedTask = { ...selectedTask, subtasks: [...selectedTask.subtasks] };
      
          updatedSelectedTask.subtasks[subtaskIndex].isCompleted = !updatedSelectedTask.subtasks[subtaskIndex].isCompleted;
      
          const taskIndex = currentBoard.columns.findIndex(column => column.tasks.includes(selectedTask));
      
          if(taskIndex !== -1) {
            const updatedBoard = { ...currentBoard };
            updatedBoard.columns[taskIndex].tasks = updatedBoard.columns[taskIndex].tasks.map(task => task === selectedTask ? updatedSelectedTask : task);

      
            setCurrentBoard(updatedBoard);
            setSelectedTask(updatedSelectedTask);
          } else {
            console.error("Selected task not found within the current board.");
          }
        } else {
          console.error("Invalid subtask index provided or no task selected.");
        }
      }, [currentBoard, selectedTask, setCurrentBoard]);

     
      


    if (currentBoard && currentBoard.columns) {
        return (
            <main className='min-h-screen overflow-y-hidden'>
                <div className="hidden">
                    <h1>{currentBoard.name}</h1>
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
                        <div key={index} className='flex flex-col justify-center items-start gap-4 w-full'>
                            <span className='flex'>
                                {column.status.icon && (
                                    <span className=' mr-4'>
                                        {column.status.icon}
                                    </span>
                                )}

                                <h2 className='font-bold tracking-widest uppercase text-blue-gray-light'>
                                    {column.name} ({column.tasks.length})
                                </h2>
                            </span>
                            {column.tasks.map((task, taskIndex) => (
                                <button onClick={() => openTask(task) }key={taskIndex} className='bg-white dark:bg-blue-gray w-[22rem] shadow-xl rounded-lg p-4 flex flex-col justify-start items-start text-start gap-1'>
                                    <h3 className='text-blue-dark font-bold text-lg dark:text-white'>{task.title}</h3>
                                    <p className='text-blue-gray-light font-bold text-sm dark:text-blue-grayish'>{task.subtasks.filter(st => st.isCompleted === false).length} of {task.subtasks.length} subtasks</p>
                                </button>
                            ))}
                        </div>
                    ))}
                </section>
            </main>
        );
    } else {
        return <main></main>;
    }
}

export default Dashboard;
