import React from 'react';
import Image from 'next/image';
import ThemeToggle from '../buttons/ThemeToggle';
import { useContext } from 'react';
import { BoardsContext } from '../context/BoardsContext';
import { BoardContext } from '../context/BoardContext';

interface NavigationProps {
    menuOpen: boolean;
    handleMenuToggle: () => void;
    handleCreateNewBoardClick: () => void;
}


const Navigation: React.FC<NavigationProps> = ({menuOpen, handleMenuToggle, handleCreateNewBoardClick }) =>{

    const {boards} = useContext(BoardsContext);
    const {setCurrentBoard} = useContext(BoardContext);

    return(
        <nav className={`bg-white dark:bg-blue-gray transition-transform duration-500 ease-in-out transform absolute z-50 top-20 left-[4rem] shadow-xl rounded-xl min-w-max max-w-xs min-h-max container flex-col justify-center items-start ${menuOpen ? 'translate-y-0' : '-translate-y-[50rem]'}`}>
        <h3 className='text-md p-3 tracking-widest font-bold uppercase text-blue-grayish mb-3'>
            All Boards ({boards?.length || 0})
        </h3>
        <ul className='flex flex-col gap-3 justify-center items-start font-bold'>
            {boards.map((board, index) => (
                <li key={index} className='w-full rounded-r-3xl hover:bg-purple-dark hover:text-white'>
                    <button className='flex justify-center p-3 items-center gap-3' onClick={() => setCurrentBoard(board)}>
                        <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20} />
                        <span>{board.name}</span>
                    </button>
                </li>
            ))}
            <li className='w-100 p-3 mb-2 font-bold'>
                <button className='flex justify-center items-center gap-3' onClick={handleMenuToggle}>
                    <Image src="/assets/icon-board.svg" alt="Board Icon" width={20} height={20} />
                    <a onClick={handleCreateNewBoardClick} className='text-purple-dark'>+ Create new Board</a>
                </button>
            </li>
        </ul>
        <div className='dark:bg-blue-dark flex justify-center items-center gap-6 bg-blue-pale p-3 rounded-lg m-5'>
            <Image src="/assets/icon-light-theme.svg" alt="Light Theme" width={25} height={25} />
            <ThemeToggle />
            <Image src="/assets/icon-dark-theme.svg" alt="Dark Theme" width={25} height={25} />
        </div>
    </nav>
    )

}

export default Navigation;