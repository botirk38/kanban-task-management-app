import Image from "next/image";
import React from "react";
import { ButtonAddTask } from "./ButtonAddTask";
import { useContext } from "react";
import { BoardContext } from "./BoardContext";
import { Subtask, Task } from "../types/Board";
import { on } from "events";

interface CreateTaskProps {
    onClose: () => void;
    statuses: string[];

}

type State = {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];

}

type Action =
    | { type: 'SET_TITLE', payload: string }
    | { type: 'SET_DESCRIPTION', payload: string }
    | { type: 'SET_STATUS', payload: string }
    | { type: 'ADD_SUBTASK', payload: Subtask }
    | { type: 'DELETE_SUBTASK', payload: number }
    | { type: 'TOGGLE_SUBTASK_COMPLETED', payload: number }
    | {type: 'UPDATE_SUBTASK', payload: {index: number, title: string}};


const reducer = (state: State, action: Action): State => {
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
    const [state, dispatch] = React.useReducer(reducer, {
        title: '',
        description: '',
        status: 'Todo',
        subtasks: []
    });

    const addTask = (newTask: Task) => {
        if(currentBoard){
            const updatedBoard = {...currentBoard};
            console.log(newTask)

            const columnIndex = currentBoard.columns.findIndex(column => column.name === newTask.status);
            console.log(newTask.status);
            onClose();

            if(columnIndex !== -1){
                updatedBoard.columns[columnIndex].tasks.push(newTask);
                setCurrentBoard(updatedBoard);
            }else{
                console.error(`No column found with the name ${newTask.status}`);
            }

        }else{
            console.error("No current board");
        }

    }

  

    return(
        <section className="fixed min-h-screen  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>

            <div className=" dark:bg-blue-mid bg-white rounded h-[37rem] max-h-full p-8  w-[23rem]" onClick={(e) => e.stopPropagation()}>
                <h2 className="font-bold text-lg mb-4">Add new Task</h2>

                <div className="flex flex-col justify-center items-start gap-6 mb-4">

                    <div className="flex flex-col justify-center items-start w-full gap-2">
                        <p className="font-bold text-sm text-blue-grayish">Title</p>
                        <input value={state.title} onChange = { e => dispatch({type:"SET_TITLE", payload: e.target.value})} className="p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm" type="text" placeholder="e.g. Take coffee break" />
                    </div>

                    <div className="flex flex-col justify-center items-start w-full gap-2">
                        <p className="font-bold text-sm text-blue-grayish">Description</p>
                        <textarea value={state.description} onChange = { e => dispatch({type:"SET_DESCRIPTION", payload: e.target.value})}className="px-3 py-6  align-text-top text-start rounded-md border border-blue-grayish w-full placeholder:text-sm " placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little." />
                    </div>
                    
                    <div className="flex flex-col justify-center w-full items-start gap-4">
                        <p className="font-bold text-sm text-blue-grayish ">Subtasks</p>
                        {state.subtasks.map((subtask, index) => (
                        <React.Fragment key={index}>
                            <div className="w-full flex justify-between items-center gap-4 ">
                                <input value={subtask.title} onChange={e => dispatch({type:"UPDATE_SUBTASK", payload: {title: e.target.value, index: index}})}className="border border-blue-grayish p-2 rounded-sm w-full placeholder:text-sm" type="text" placeholder="e.g. Make coffee" />
                                <button onClick={ e => dispatch({type:"DELETE_SUBTASK", payload: index})}>
                                    <Image src="/assets/icon-cross.svg" alt="delete subtask" width={20} height={20} />
                                </button>
                            </div>
                        </React.Fragment>
                        ))}

                        
                        <ButtonAddTask  className=" bg-opacity-10 text-purple-dark " onClick={() => dispatch({type:"ADD_SUBTASK", payload: {title:"", isCompleted: false}}) }>
                            + Add new Subtask
                        </ButtonAddTask>

                    </div>

                    <div className="flex flex-col justify-center items-start w-full gap-2">
                        <p className="font-bold text-sm text-blue-grayish">Status</p>
                        <select value={state.status} onChange={e => dispatch({type:"SET_STATUS", payload:e.target.value})} className="border border-blue-grayish p-2 rounded-md w-full">
                            {statuses.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>


                    <ButtonAddTask className="text-white" onClick={() => addTask({title: state.title, description: state.description, status: state.status, subtasks: state.subtasks})}> Create Task</ButtonAddTask> 

                </div>


            </div>

        </section>
                

    )


}

export default CreateTask;