import { ButtonAddTask } from "../buttons/ButtonAddTask";
import { ButtonPrimary } from "../buttons/ButtonPrimary";
import { BoardAction, BoardState } from "../board/CreateBoard";
import React, { useState } from "react";

interface BoardFormProps {
    state: BoardState;
    title: string;
    dispatch: React.Dispatch<BoardAction>;
    onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
    action: string;


}


const BoardForm: React.FC<BoardFormProps> = ({ title, state, dispatch, onSubmit, action }) => {
    const [newColumn, setNewColumn] = useState("");  // Temporary state for column name

    const handleAddColumn = () => {
        dispatch({ type: "ADD_BOARD_COLUMN", payload: newColumn });
    };

    const handleColumnChange = (index: number, value: string) => {
        const updatedColumns = [...state.boardColumns];
        updatedColumns[index] = value;
        dispatch({ type: "SET_BOARD_COLUMNS", payload: updatedColumns });
    };

    return (
        <div className="flex flex-col dark:bg-blue-mid bg-white gap-4 rounded max-h-[calc(100vh-2rem)] overflow-y-auto p-8 w-[23rem]" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-lg dark:text-white">{title}</h2>
            <div className="flex flex-col justify-center items-start w-full gap-4">
                <p className="dark:text-white font-bold text-sm text-blue-grayish">Board Name</p>
                <input className="dark:bg-blue-mid p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm" placeholder="e.g. Web Design" value={state.boardName} onChange={e => dispatch({ type: "SET_BOARD_NAME", payload: e.target.value })} />
            </div>

            <div className="flex flex-col justify-center items-start w-full gap-4">
                <p className="dark:text-white font-bold text-sm text-blue-grayish">Board Columns</p>
                {state.boardColumns.map((column, index) => (
                    <React.Fragment key={index}>
                    <input 
                        className="dark:bg-blue-mid p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm" 
                        placeholder="Todo" 
                        value={column} 
                        onChange={e => handleColumnChange(index, e.target.value)}
                    />
                    </React.Fragment>
            ))}
                <ButtonAddTask className="dark:bg-white bg-opacity-10 text-purple-dark" onClick={handleAddColumn}>+ Add new Column</ButtonAddTask>
            </div>

            <div className="flex flex-col justify-center items-center w-full">
                <ButtonPrimary className="w-full" onClick={onSubmit}> 
                    {action}
                </ButtonPrimary>
            </div>
        </div>
    )
}

export default BoardForm;
