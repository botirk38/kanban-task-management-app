import React from 'react';
import { useContext } from 'react';
import { BoardsContext } from '../context/BoardsContext';
import { BoardContext } from '../context/BoardContext';
import BoardList from '../menus/BoardList';
import CreateNewBoard from './CreateNewBoard';
import ThemeControl from './ThemeControl';
import SidebarBtn from './SidebarBtn';

interface NavigationProps {
    menuOpen: boolean;
    handleMenuToggle: () => void;
    handleCreateNewBoardClick: () => void;
}


const Navigation: React.FC<NavigationProps> = ({menuOpen, handleMenuToggle, handleCreateNewBoardClick }) =>{

    const {boards} = useContext(BoardsContext);
    const {setCurrentBoard} = useContext(BoardContext);

    return(
    <nav className={`bg-white w-full min-h-full dark:bg-blue-gray transition-transform duration-500 ease-in-out transform absolute z-50 top-20 left-[4rem] shadow-xl rounded-xl min-w-max max-w-xs min-h-max container flex-col justify-center items-start ${menuOpen ? 'translate-y-0' : '-translate-y-[50rem]'} lg:z-0 lg:relative lg:rounded-none lg:top-0 lg:shadow-none lg:left-0 `}>
        <h3 className='text-md p-3 tracking-widest font-bold uppercase text-blue-grayish mb-3'>
            All Boards ({boards?.length || 0})
        </h3>
            <BoardList boards={boards} onBoardClick={setCurrentBoard}  />
            <CreateNewBoard onMenuToggle={handleMenuToggle} onCreate={handleCreateNewBoardClick} />
        
        <ThemeControl />

    </nav>
    )

}

export default Navigation;