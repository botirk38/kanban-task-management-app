import CreateBoard from "../board/CreateBoard";
import ModalMenu from "../menus/ModalMenu";
import CreateTask from "../task/CreateTask";
import BoardHeader from "./BoardHeader";
import HeaderControls from "./HeaderControls";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Image from "next/image";

export interface NavigationProps {
    isMobile: boolean;
    menuOpen: boolean;
    handleMenuToggle: () => void;
    handleAddNewTaskClick: () => void;
    handleModalMenuClick: () => void;
    handleCreateNewBoardClick: () => void;
    AddNewTaskOpen: boolean;
    createNewBoardOpen: boolean;
    modalMenuOpen: boolean;
    currentBoard: any;
    boards: any;
    statuses: string[];
}


const MobileNavigation: React.FC<NavigationProps> = ({
    isMobile, 
    menuOpen, 
    handleMenuToggle, 
    handleAddNewTaskClick, 
    handleModalMenuClick,
    handleCreateNewBoardClick,
    AddNewTaskOpen,
    createNewBoardOpen,
    modalMenuOpen,
    currentBoard,
    boards,
    statuses
}) => {

    return(
    <header className="container flex gap-3 justify-start items-center p-3 dark:bg-blue-mid w-full dark:text-white">
            <Logo isMobile={isMobile}/>
            <Navigation menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} handleCreateNewBoardClick={handleCreateNewBoardClick}/>
            { currentBoard? <BoardHeader currentBoard={currentBoard} handleMenuToggle={handleMenuToggle} menuOpen={menuOpen}/> : <BoardHeader currentBoard={boards[0]} handleMenuToggle={handleMenuToggle} menuOpen={menuOpen}/>}

            <HeaderControls handleAddNewTaskClick={handleAddNewTaskClick} handleModalMenuClick={handleModalMenuClick}/>

            <div className='hidden'>
                <Image src="/assets/icon-hide-sidebar.svg" alt="Hide Sidebar" width={25} height={25}/>
            </div>

            {AddNewTaskOpen && (
                <CreateTask onClose={handleAddNewTaskClick} statuses={statuses}/>
            )
                }

            {modalMenuOpen && 
                <ModalMenu actionType='Board'/>
            }
            {createNewBoardOpen && (
                <CreateBoard onClose={handleCreateNewBoardClick}/>
            )
                }
        </header>
    );

}

export default MobileNavigation;