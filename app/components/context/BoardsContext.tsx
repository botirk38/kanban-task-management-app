'use client'

import {createContext, useState, useContext, useEffect} from 'react';
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
  
    useEffect( () => {
      async function fetchBoards(){
      try{
        const response = await fetch("/api/boards", {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        
        const data = await response.json()
        setBoards(data);
      } catch (err: any) {
        console.error("Error fetching boards: ", err);
      } 
    };


    fetchBoards();

    }, []);

    useEffect( () => {
      console.log(boards);
    }, [boards])
  
    return (
      <BoardsContext.Provider value={{ boards, setBoards }}>
        {children}
      </BoardsContext.Provider>
    );
  };
  
  export const useBoards = (): BoardsContextType => useContext(BoardsContext);
    
