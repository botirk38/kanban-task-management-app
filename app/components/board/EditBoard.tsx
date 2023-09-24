import BoardForm from "../forms/BoardForm";
import { boardReducer } from "./CreateBoard";
import React, { useContext, useReducer, useState } from "react";
import { BoardContext } from "../context/BoardContext";

interface EditBoardProps  {
    onClose: () => void;
}

const EditBoard: React.FC<EditBoardProps> = ({ onClose }) => {
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);

    const initialState = {
        boardName: currentBoard?.name || '',
        boardColumns: currentBoard?.columns.map(column => column.name) || []
    };
    const [state, dispatch] = useReducer(boardReducer, initialState);
    const [originalColumns, setOriginalColumns] = useState(initialState.boardColumns);

    const editBoard = () => {
        if (currentBoard) {
            const modifiedBoard = {
                ...currentBoard,
                name: state.boardName,
                columns: state.boardColumns.map((columnName, idx)=> ({
                    name: columnName,
                    tasks: currentBoard.columns.find(c => c.name === originalColumns[idx])?.tasks || []
                }))
            };
            setCurrentBoard(modifiedBoard);
        } else {
            console.error("No current board");
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editBoard();
        onClose();
    }

    return (
        <section className="fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <BoardForm title="Edit Board" state={state} dispatch={dispatch} onSubmit={handleSubmit} action={"Save Changes"} />
        </section>
    )

}

export default EditBoard;
