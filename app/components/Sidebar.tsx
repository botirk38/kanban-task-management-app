'use client'

import React, { useContext, useState } from 'react';


import { BoardContext } from './context/BoardContext';
import { BoardsContext } from './context/BoardsContext';
import { useToast } from '@/components/ui/use-toast';
import { useMobileDetection } from '../hooks/mobileDetection';
import MobileNavigation from './sidebar/MobileNavigation';
import DesktopNavigation from './sidebar/DesktopNavigation';
import { Toaster } from '@/components/ui/toaster';


const Sidebar = () => {
    const isMobile = useMobileDetection();

    const [menuOpen, setMenuOpen] = useState(false);
    const [AddNewTaskOpen, setAddNewTaskOpen] = useState(false);
    const [createNewBoardOpen, setCreateNewBoardOpen] = useState(false);
    const [modalMenuOpen, setModalMenuOpen] = useState(false);


    const { currentBoard } = useContext(BoardContext);
    const { boards } = useContext(BoardsContext);

    const statuses = Array.from(new Set(currentBoard?.columns.flatMap(column => column.name) || []));


    const { toast } = useToast();

    const handleAddNewTaskClick = () => {
        // Check if there are columns in the current board
        if (currentBoard && currentBoard.columns && currentBoard.columns.length > 0) {
            setAddNewTaskOpen(prevState => !prevState);
        } else {
            // Show toast notification
            toast({
                title: "No columns available",
                description: "Please add a column before adding a task.",
            });
        }
    }


    const handleModalMenuClick = () => {
        // Check if there is a current board
        if (currentBoard) {
            setModalMenuOpen(prevState => !prevState);
        } else {
            // Show toast notification
            toast({
                title: "No board selected",
                description: "Please select or create a board before proceeding.",
            });
        }
    }

    const handleCreateNewBoardClick = () => {
        setCreateNewBoardOpen(prevState => !prevState);
    }


    const handleMenuToggle = () => setMenuOpen(prev => !prev);

    if (isMobile) {
        return (

            <>
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
                    setModalMenuOpen={setModalMenuOpen}
                    currentBoard={currentBoard}
                    boards={boards}
                    statuses={statuses}
                />

            <Toaster/>

            </>
        );

    } else {
        return (
            <DesktopNavigation isMobile={isMobile} handleMenuToggle={handleMenuToggle} handleCreateNewBoardClick={handleCreateNewBoardClick} createNewBoardOpen={createNewBoardOpen} />
        )
    }
}

export default Sidebar;


