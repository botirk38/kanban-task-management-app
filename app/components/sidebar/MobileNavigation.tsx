import { Toaster } from "@/components/ui/toaster";
import CreateBoard from "../board/CreateBoard";
import ModalMenu from "../menus/ModalMenu";
import CreateTask from "../task/CreateTask";
import BoardHeader from "./BoardHeader";
import HeaderControls from "./HeaderControls";
import Logo from "./Logo";
import Navigation from "./Navigation";


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
    setModalMenuOpen: (state: boolean) => void;
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
    statuses,
    setModalMenuOpen
}) => {

    


    return(
    <header className="container flex  justify-start items-center p-3 dark:bg-blue-mid w-full dark:text-white">
            <Logo isMobile={isMobile}/>
            <Navigation menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} handleCreateNewBoardClick={handleCreateNewBoardClick}/>
            { currentBoard? <BoardHeader currentBoard={currentBoard} handleMenuToggle={handleMenuToggle} menuOpen={menuOpen}/> : <BoardHeader currentBoard={boards[0]} handleMenuToggle={handleMenuToggle} menuOpen={menuOpen}/>}

            <HeaderControls handleAddNewTaskClick={handleAddNewTaskClick} handleModalMenuClick={handleModalMenuClick}/> 
        
            
            {AddNewTaskOpen && (
                <CreateTask onClose={handleAddNewTaskClick} statuses={statuses}/>
            )
                }

            {modalMenuOpen && 
                <ModalMenu actionType='Board' onClose={() => setModalMenuOpen(false) }/>
            }
            {createNewBoardOpen && (
                <CreateBoard onClose={handleCreateNewBoardClick}/>
            )
                }

            <Toaster/>

     
        </header>
    );

}

export default MobileNavigation;
