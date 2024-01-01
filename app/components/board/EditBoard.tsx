import BoardForm from "../forms/BoardForm";
import { boardReducer } from "./CreateBoard";
import React, { useContext, useReducer} from "react";
import { BoardContext } from "../context/BoardContext";
import { Board } from "@/app/types/Board";
interface EditBoardProps  {
    onClose: () => void;
    parentClose?: () => void;
}

const EditBoard: React.FC<EditBoardProps> = ({ onClose, parentClose }) => {
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);

    const initialState = {
        boardName: currentBoard?.name || '',
        boardColumns: currentBoard?.columns.map(column => column.name) || []
    };
    const [state, dispatch] = useReducer(boardReducer, initialState);

    const editBoard = () => {
        if (currentBoard) {
            const modifiedBoard: Board = {
                ...currentBoard,
                name: state.boardName,
                columns: state.boardColumns.map((columnName, idx) => ({
                    ...currentBoard.columns[idx],  // Spread existing properties
                    name: columnName,
                    
                })),
            };
            return modifiedBoard;
        } else {
            console.error("No current board");
        }
}


    const updateBoard = async (board : Board | undefined) => {
        if (!board) {
            throw new Error("Board is empty.");
        }


    try {
        const response = await fetch(`/api/boards/${board.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(board)
        });
        if (!response.ok) {
            throw new Error('Failed to update board');
        }
        return await response.json();

    } catch (error) {
        console.error('Error updating board:', error);
        
    }
};


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const modifiedBoard = editBoard();
        console.log("Modified Board: ", modifiedBoard);
        const updatedBoard = await updateBoard(modifiedBoard)
        console.log("Updated Board: ", updateBoard);
        setCurrentBoard(updatedBoard);
        onClose();
        parentClose ? parentClose() : null;
    }

    return (
        <section className="fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <BoardForm title="Edit Board" state={state} dispatch={dispatch} onSubmit={handleSubmit} action={"Save Changes"} />
        </section>
    )

}

export default EditBoard;
