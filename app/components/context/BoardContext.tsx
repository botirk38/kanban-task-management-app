
'use client'

import {createContext, useEffect} from 'react';
import { useState, FC } from 'react';
import { Board } from '../../types/Board';


type BoardContextType = {
    currentBoard: Board | null;
    setCurrentBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  };
  
export const BoardContext = createContext<BoardContextType>({
    currentBoard: null,
    setCurrentBoard: () => { throw new Error("setCurrentBoard function must be overridden"); },
  });
  

type BoardProviderProps = {
    children: React.ReactNode;
};

export const BoardProvider: FC<BoardProviderProps> = ({children}) => {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    
    
    return (
        <BoardContext.Provider value={{currentBoard, setCurrentBoard}}>
            {children}
        </BoardContext.Provider>
    )
}


