'use client'

import {createContext, useState, useContext} from 'react';
import boardsData from '../../data.json';
import { Board } from '../../types/Board';
import { Dispatch, SetStateAction } from 'react';

type BoardsContextType = {
    boards: Board[];
    setBoards: Dispatch<SetStateAction<Board[]>>;
  };
  
  const defaultBoardsValue: BoardsContextType = {
    boards: [],
    setBoards: () => { throw new Error("setBoards function must be overridden"); },
  };
  
  export const BoardsContext = createContext<BoardsContextType>(defaultBoardsValue);
  
  interface BoardsProviderProps {
    children: React.ReactNode;
  }
  
  export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
    const [boards, setBoards] = useState<Board[]>(boardsData.boards);
  
    return (
      <BoardsContext.Provider value={{ boards, setBoards }}>
        {children}
      </BoardsContext.Provider>
    );
  };
  
  export const useBoards = (): BoardsContextType => useContext(BoardsContext);
    