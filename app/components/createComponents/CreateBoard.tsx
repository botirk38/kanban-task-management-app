import React, { useContext, useReducer } from 'react';
import BoardForm from '../forms/BoardForm';
import { Board } from '../../types/Board';
import { BoardContext } from '../context/BoardContext';
import { BoardsContext } from '../context/BoardsContext';

interface CreateBoardProps {
    onClose: () => void;
}

export type BoardState = {
    boardName: string;
    boardColumns: string[];
}

export type BoardAction =
    | { type: 'SET_BOARD_NAME', payload: string }
    | { type: 'SET_BOARD_COLUMNS', payload: string[] }
    | { type: 'ADD_BOARD_COLUMN', payload: string };

const initialState: BoardState = {
    boardName: "",
    boardColumns: []
};

export const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
        case "SET_BOARD_NAME":
            return { ...state, boardName: action.payload };
        case "SET_BOARD_COLUMNS":
            return { ...state, boardColumns: action.payload };
        case "ADD_BOARD_COLUMN":
            return { ...state, boardColumns: [...state.boardColumns, action.payload] };
        default:
            return state;
    }
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onClose }) => {
    const [state, dispatch] = useReducer(boardReducer, initialState);
    const { currentBoard, setCurrentBoard } = useContext(BoardContext);
    const {boards, setBoards} = useContext(BoardsContext);

    const createBoard = (newBoard: Board) => {
        const updatedBoards = [...boards, newBoard];
        setCurrentBoard(newBoard);
        setBoards(updatedBoards);
        onClose();
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createBoard({
            name: state.boardName,
            columns: state.boardColumns.map(column => ({
                name: column,
                tasks: []
            }))
        });
        dispatch({ type: 'SET_BOARD_NAME', payload: '' });
        dispatch({ type: 'SET_BOARD_COLUMNS', payload: [] });
    }

    return (
        <section className="fixed min-h-screen inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
            <BoardForm
                title="Create new Board"
                state={state}
                dispatch={dispatch}
                onSubmit={handleSubmit}
            />
        </section>
    )
}

export default CreateBoard;
