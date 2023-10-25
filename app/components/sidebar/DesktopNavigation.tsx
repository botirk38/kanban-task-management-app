

import React, { useContext, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { BoardContext } from "../context/BoardContext";
import CreateBoard from "../board/CreateBoard";
import { ThemeContext } from '../context/FormContext';
import SidebarBtn from "./SidebarBtn";

interface DesktopNavigationProps {
    isMobile: boolean;
    handleMenuToggle: () => void;
    handleCreateNewBoardClick: () => void;
    createNewBoardOpen: boolean;

}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ isMobile, handleMenuToggle, handleCreateNewBoardClick, createNewBoardOpen}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
            <header className={`dark:bg-blue-gray z-50 flex flex-col justify-start items-start p-4 bg-white w-full gap-20 min-h-screen transition-transform duration-300 `}>
                <Logo isMobile={isMobile} />
                <Navigation menuOpen={true} handleMenuToggle={handleMenuToggle} handleCreateNewBoardClick={handleCreateNewBoardClick} />

                {createNewBoardOpen && <CreateBoard onClose={handleCreateNewBoardClick} />}

            </header>
    );
}

export default DesktopNavigation;




