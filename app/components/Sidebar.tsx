'use client'

import React, { useContext, useState } from 'react';
import Image from 'next/image';


import { BoardContext } from './context/BoardContext';
import { BoardsContext } from './context/BoardsContext';


import { useMobileDetection } from '../hooks/mobileDetection';
import MobileNavigation from './sidebar/MobileNavigation';
import DesktopNavigation from './sidebar/DesktopNavigation';


const Sidebar  = () => {
    const isMobile = useMobileDetection();

    const [menuOpen, setMenuOpen] = useState(false);
    const [AddNewTaskOpen, setAddNewTaskOpen] = useState(false);
    const [createNewBoardOpen, setCreateNewBoardOpen] = useState(false);
    const [modalMenuOpen, setModalMenuOpen] = useState(false);


    const {currentBoard} = useContext(BoardContext);
    const {boards} = useContext(BoardsContext);

    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));


    const handleAddNewTaskClick = () => {
        setAddNewTaskOpen(prevState => !prevState);
        console.log("Add New Task Clicked", AddNewTaskOpen);
    }

    const handleCreateNewBoardClick = () => {
        setCreateNewBoardOpen(prevState => !prevState);
    }

    const handleModalMenuClick = () => {
        setModalMenuOpen(prevState => !prevState);
    }

    const handleMenuToggle = () => setMenuOpen(prev => !prev);
    if(isMobile){
    return(
        <MobileNavigation 
        isMobile={isMobile} 
        menuOpen={menuOpen} 
        handleMenuToggle={handleMenuToggle}
        handleAddNewTaskClick={handleAddNewTaskClick}
        handleModalMenuClick={handleModalMenuClick}
        handleCreateNewBoardClick={handleCreateNewBoardClick}
        AddNewTaskOpen={AddNewTaskOpen}
        createNewBoardOpen={createNewBoardOpen}
        modalMenuOpen={modalMenuOpen}
        currentBoard={currentBoard}
        boards={boards}
        statuses={statuses}
        />
    );
    
    }else{
        return(
            <DesktopNavigation isMobile={isMobile} handleMenuToggle={handleMenuToggle} handleCreateNewBoardCLick={handleCreateNewBoardClick}/>
        )         
    }
}
export default Sidebar;
