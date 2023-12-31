
'use client'

import {createContext, useContext, useEffect} from 'react';
import { useState, FC } from 'react';
import { Board } from '../../types/Board';
import { BoardsContext } from './BoardsContext';


type BoardContextType = {
    currentBoard: Board | null | undefined;
    setCurrentBoard: React.Dispatch<React.SetStateAction<Board | null | undefined>>;
  };
  
export const BoardContext = createContext<BoardContextType>({
    currentBoard: null, 
    setCurrentBoard: () => { throw new Error("setCurrentBoard function must be overridden"); },
  });
  

type BoardProviderProps = {
    children: React.ReactNode;
};

export const BoardProvider: FC<BoardProviderProps> = ({children}) => {
    const {boards} = useContext(BoardsContext);
    const [currentBoard, setCurrentBoard] = useState<Board | null | undefined>(null);
    
    useEffect(() => {
        console.log("Boards 0:", boards[0])

        if (boards && boards.length > 0) {
            setCurrentBoard(boards[0]);
        }
    }, []);


    return (
        <BoardContext.Provider value={{currentBoard, setCurrentBoard}}>
            {children}
        </BoardContext.Provider>
    )
}


