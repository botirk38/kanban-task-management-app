'use client'

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import {ButtonPrimary} from './buttons/ButtonPrimary';
import {Board } from '../types/Board';
import ThemeToggle from './buttons/ThemeToggle';
import { BoardContext } from './context/BoardContext';
import CreateTask from './createComponents/CreateTask'
import CreateBoard from './createComponents/CreateBoard';
interface SidebarProps {
    boards: Board[];
  }

const Sidebar: React.FC<SidebarProps> = ({boards}) => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [AddNewTaskOpen, setAddNewTaskOpen] = useState(false);
    const {currentBoard, setCurrentBoard} = useContext(BoardContext);
    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.tasks.map(task => task.status)) || []));
    const [createNewBoardOpen, setCreateNewBoardOpen] = useState(false); 


    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageWidth = isMobile ? 40 : 200;
    const imageHeight = isMobile ? 40 : 200; 

    const handleAddNewTaskClick = () => {
        setAddNewTaskOpen(prevState => !prevState);
        console.log("Add New Task Clicked", AddNewTaskOpen);
    }

    const handleCreateNewBoardClick = () => {
        setCreateNewBoardOpen(prevState => !prevState);
    }

    

    return(
        <header className="container flex gap-3 justify-start items-center p-3 dark:bg-blue-mid w-full dark:text-white">
            <picture>
                <Image 
                    src={isMobile ? "/assets/logo-mobile.svg" : "/assets/logo-dark.svg"} 
                    width={imageWidth} 
                    height={imageHeight} 
                    alt="Logo" 
                />
            </picture>

            <nav className={` bg-white dark:bg-blue-gray transition-transform duration-500 ease-in-out transform absolute z-50 top-20 left-[4rem] shadow-xl rounded-xl min-w-max max-w-xs min-h-max  container flex-col justify-center items-start ${menuOpen ? 'translate-y-0' : '-translate-y-[50rem]'}`}>

                <h3 className='text-md p-3 tracking-widest font-bold uppercase text-blue-grayish mb-3'>
                    All Boards ({boards?.length || 0})
                </h3>

                <ul className=' flex flex-col gap-3 justify-center items-start font-bold  '>
                    {boards && boards.map((board, index )=> (
                        <li key={index} className='w-full rounded-r-3xl hover:bg-purple-dark hover:text-white '>
                            <button className='flex justify-center p-3 items-center gap-3'>
                                <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20}/>
                                <a className='text-blue-grayish hover:text-white' onClick={() => setCurrentBoard(board)}>{board.name}</a>
                            </button>
                        </li>

                    ))}

                        <li className='w-100 p-3 mb-2 font-bold '>
                            <button className='flex justify-center items-center gap-3' >
                                <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20}/>
                                <a onClick={handleCreateNewBoardClick} className='text-purple-dark' >+ Create new Board</a>
                            </button>
                        </li>

                </ul>

                

                <div className='dark:bg-blue-dark flex justify-center items-center gap-6 bg-blue-pale p-3 rounded-lg m-5'>
                    <Image src="/assets/icon-light-theme.svg" alt="Light Theme" width={25} height={25}/>
                    <ThemeToggle />
                    <Image src="/assets/icon-dark-theme.svg" alt="Dark Theme" width={25} height={25}/>
                </div>
            </nav>

            <div className='flex container justify-start items-center gap-2'>
                <h2 className='text-xl font-bold'>{currentBoard?.name}</h2>
                <button><Image src={`${!menuOpen ?"/assets/icon-chevron-down.svg": "/assets/icon-chevron-up.svg"}`} alt="Open Menu" width={15} height={15} onClick={ () => setMenuOpen(prevState => !prevState)} /> </button>
            </div>

            <div className='flex justify-center items-center '>
                <ButtonPrimary className='container w-[4rem]  justify-center items-center m-0' onClick={handleAddNewTaskClick} >
                    <Image src="/assets/icon-add-task-mobile.svg" className='m-0 object-cover w-full p-1' width={10} height={10} alt="Add a task"/>
                </ButtonPrimary>

                <ButtonPrimary className='bg-transparent'><Image src="/assets/icon-vertical-ellipsis.svg" className='m-0 object-cover w-full  ' width={10} height={10} alt="More Info"/></ButtonPrimary>
            </div>

            


            

          

            <div className='hidden'>
                <Image src="/assets/icon-hide-sidebar.svg" alt="Hide Sidebar" width={25} height={25}/>
            </div>

            {AddNewTaskOpen && (
                <CreateTask onClose={handleAddNewTaskClick} statuses={statuses}/>
            )
                }
            {createNewBoardOpen && (
                <CreateBoard onClose={handleCreateNewBoardClick}/>
            )
                }



        </header>
    );
}

export default Sidebar;
