import React, { useEffect } from "react";
import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { Column, Subtask, Task } from "../../types/Board";
import TaskForm from "../forms/TaskForm";
import useTaskOperations from "@/app/hooks/taskOperations";
import { BoardsContext } from "../context/BoardsContext";

interface CreateTaskProps {
    onClose: () => void;
    statuses: string[];

}



export type State = {
    title: string;
    description: string;
    status: string;
    subtasks?: Subtask[];
    columnId: number;
    id: number;

}

export type Action =
    | { type: 'SET_TITLE', payload: string }
    | { type: 'SET_DESCRIPTION', payload: string }
    | { type: 'SET_STATUS', payload: { status: string, columns: Column[] } }
    | { type: 'ADD_SUBTASK', payload: Subtask }
    | { type: 'DELETE_SUBTASK', payload: number }
    | { type: 'TOGGLE_SUBTASK_COMPLETED', payload: number }
    | {type: 'UPDATE_SUBTASK', payload: {index: number, title: string}};


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_DESCRIPTION':
            return { ...state, description: action.payload };
        case 'SET_STATUS':
            const { status, columns } = action.payload;
            const columnMatch = columns.find( (column) => column.name === status)
            const newColumnId = columnMatch ? columnMatch.id : state.columnId;
            return { 
                ...state, 
                status: status,
                columnId: newColumnId
    }; 
        case 'ADD_SUBTASK':
            return { ...state, subtasks: [...state.subtasks!, action.payload] };
        case 'DELETE_SUBTASK':
            return { ...state, subtasks: state.subtasks?.filter((_, index) => index !== action.payload) };
        case 'TOGGLE_SUBTASK_COMPLETED':
            return {
                ...state,
                subtasks: state.subtasks?.map((subtask, index) => {
                    if (index === action.payload) {
                        return { ...subtask, completed: !subtask.isCompleted };
                    }
                    return subtask;
                })
            };
        case 'UPDATE_SUBTASK':
            return {
                ...state,
                subtasks: state.subtasks?.map((subtask, index) => {
                    if (index === action.payload.index) {
                        return { ...subtask, title: action.payload.title };
                    }
                    return subtask;
                })
            };
        default:
            return state;
    }
}





const CreateTask: React.FC<CreateTaskProps> = ({onClose, statuses}) => {

    const {currentBoard, setCurrentBoard} = useContext(BoardContext);
    const {boards} = useContext(BoardsContext);
    const columns = currentBoard ? currentBoard.columns : [];


    const [state, dispatch] = React.useReducer(reducer, {
        title: '',
        description: '',
        status: statuses[0],
        subtasks: [],
        columnId: columns ? columns[0].id : 0 ,
        id: 0
    });

    const {addTask} = useTaskOperations({ currentBoard, setCurrentBoard, onClose });

    useEffect(() => {
    if (!currentBoard && boards && boards.length > 0) {
        setCurrentBoard(boards[0]);
    }
    }, [boards, currentBoard, setCurrentBoard]);



  

    return(
        <section className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
            <TaskForm 
                state={state} 
                dispatch={dispatch} 
                statuses={statuses} 
                onSubmit={(e) => {
                    e.preventDefault();  
                    addTask(state);      
                }}
                title="Create Task" 
                columns={columns}
            />
        </section>
    );
    

}

export default CreateTask;
