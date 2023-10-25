import React, { useEffect } from "react";
import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { Subtask, Task } from "../../types/Board";
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
    subtasks: Subtask[];

}

export type Action =
    | { type: 'SET_TITLE', payload: string }
    | { type: 'SET_DESCRIPTION', payload: string }
    | { type: 'SET_STATUS', payload: string }
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
            return { ...state, status: action.payload };
        case 'ADD_SUBTASK':
            return { ...state, subtasks: [...state.subtasks, action.payload] };
        case 'DELETE_SUBTASK':
            return { ...state, subtasks: state.subtasks.filter((_, index) => index !== action.payload) };
        case 'TOGGLE_SUBTASK_COMPLETED':
            return {
                ...state,
                subtasks: state.subtasks.map((subtask, index) => {
                    if (index === action.payload) {
                        return { ...subtask, completed: !subtask.isCompleted };
                    }
                    return subtask;
                })
            };
        case 'UPDATE_SUBTASK':
            return {
                ...state,
                subtasks: state.subtasks.map((subtask, index) => {
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


    const [state, dispatch] = React.useReducer(reducer, {
        title: '',
        description: '',
        status: statuses[0],
        subtasks: []
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
            />
        </section>
    );
    

}

export default CreateTask;