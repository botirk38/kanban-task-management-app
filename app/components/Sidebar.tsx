'use client'

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import {ButtonPrimary} from './buttons/ButtonPrimary';

import EditBoard from './board/EditBoard';
import { BoardContext } from './context/BoardContext';
import { BoardsContext } from './context/BoardsContext';

import CreateTask from './task/CreateTask'
import CreateBoard from './board/CreateBoard';
import Logo from './sidebar/Logo';
import Navigation from './sidebar/Navigation';
import BoardHeader from './sidebar/BoardHeader';

interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [isMobile, setIsMobile] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);
    const [AddNewTaskOpen, setAddNewTaskOpen] = useState(false);
    const [createNewBoardOpen, setCreateNewBoardOpen] = useState(false);
    const [editBoardOpen, setEditBoardOpen] = useState(false);


    const {currentBoard, setCurrentBoard} = useContext(BoardContext);
    const {boards, setBoards} = useContext(BoardsContext);

    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));


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

    const handleEditBoardClick = () => {
        setEditBoardOpen(prevState => !prevState);
    }

    const handleMenuToggle = () => setMenuOpen(prev => !prev);

    

    

    return(
        <header className="container flex gap-3 justify-start items-center p-3 dark:bg-blue-mid w-full dark:text-white">
            <Logo isMobile={isMobile}/>
            <Navigation menuOpen={menuOpen} handleMenuToggle={handleMenuToggle}/>
            {currentBoard ? <BoardHeader currentBoard={currentBoard} handleMenuToggle={handleMenuToggle} menuOpen={menuOpen}/> : null}

            <div className='flex justify-center items-center '>
                <ButtonPrimary className='container w-[4rem]  justify-center items-center m-0' onClick={handleAddNewTaskClick} >
                    <Image src="/assets/icon-add-task-mobile.svg" className='m-0 object-cover w-full p-1' width={10} height={10} alt="Add a task"/>
                </ButtonPrimary>

                <ButtonPrimary onClick={handleEditBoardClick} className='bg-transparent'><Image src="/assets/icon-vertical-ellipsis.svg" className='m-0 object-cover w-full  ' width={10} height={10} alt="More Info" /></ButtonPrimary>
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

            {editBoardOpen && (
                <EditBoard onClose={handleEditBoardClick}/>
            )
                }



        </header>
    );
}

export default Sidebar;
