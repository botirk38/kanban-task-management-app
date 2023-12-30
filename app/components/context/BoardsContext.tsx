'use client'

import {createContext, useState, useContext, useEffect} from 'react';
import { Board, Column } from '../../types/Board';
import { Dispatch, SetStateAction } from 'react';
import { BoardContext } from './BoardContext';

type BoardsContextType = {
    boards: Board[];
    setBoards: Dispatch<SetStateAction<Board[]>>;
    addBoard: (newBoard: Board) => void;
    deleteBoard: (boardId: number) => void;
    fetchBoards: () => void;
  };
  
  const defaultBoardsValue: BoardsContextType = {
    boards: [],
    setBoards: () => { throw new Error("setBoards function must be overridden"); },
    addBoard: () => { throw new Error("addBoard needs to be overridden")},
    deleteBoard: () => { throw new Error("deleteBoard must be overridden")},
    fetchBoards: () => { throw new Error("deleteBoard must be overridden")},
     
  };
  
  export const BoardsContext = createContext<BoardsContextType>(defaultBoardsValue);
  
  interface BoardsProviderProps {
    children: React.ReactNode;
  }
 

export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const {currentBoard} = useContext(BoardContext);

  async function addBoard(newBoard: Board) {
    console.log("New Board:", JSON.stringify(newBoard));
    try {
      const response = await fetch('api/boards', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBoard),
      });

      if (!response.ok) {
        throw new Error('Failed to add board');
      }

      setBoards(prevBoards => [...prevBoards, newBoard]);
    } catch (err: any) {
      console.error("Error adding boards: ", err);
    }
  }

async function deleteBoard(boardId: string) {
  console.log("Deleting Board:", boardId);
  try {
    const response = await fetch(`api/boards/${boardId}`, {
        method: 'DELETE', 
        headers:{"Content-Type": "application/json"},
        
    });

    if (!response.ok) {
      // Only attempt to parse JSON if the response is not 204 and has a JSON content type
      if (response.status !== 204 && response.headers.get("Content-Type")?.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(`Failed to delete board: ${errorData.detail || 'Server error'}`);
      } else {
        throw new Error(`Failed to delete board: Server responded with status ${response.status}`);
      }
    }

    setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
  } catch (err) {
    console.error("Error deleting board: ", err);
  }
}

 async function fetchBoards() {

      try {
        const response = await fetch("/api/boards", {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        console.log(data);
        setBoards(data);
      } catch (err: any) {
        console.error("Error fetching boards: ", err);
      }
    };


  useEffect(() => {
   
    fetchBoards();
  }, []);

  useEffect( () => {
      fetchBoards();
  }, [currentBoard]);

  return (
    <BoardsContext.Provider value={{ boards, setBoards, addBoard, deleteBoard, fetchBoards}}>
      {children}
    </BoardsContext.Provider>
  );
};

export const useBoards = (): BoardsContextType => useContext(BoardsContext);

