import React from "react";
import { ButtonAddTask } from "../buttons/ButtonAddTask";
import Image from "next/image";
import { Action, State } from "../task/CreateTask";
import { Column} from "@/app/types/Board";


interface TaskFormProps {
    state: State;
    dispatch: React.Dispatch<Action>;
    statuses: string[];
    onSubmit: (event: React.FormEvent<HTMLButtonElement>) => void;
    title: string;
    onStatusChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    columns: Column[];
}

const TaskForm: React.FC<TaskFormProps> = ({ state, dispatch, statuses = [], onSubmit, title, columns}) => {
    return (
      <div className="absolute lg:right-60 flex flex-col dark:bg-blue-mid bg-white gap-4 rounded max-h-[calc(100vh-2rem)] overflow-y-auto p-8 w-[23rem]" onClick={e => e.stopPropagation()}>
        {/* Title Input */}
        <div className="flex flex-col justify-center items-start w-full">
          <p className="dark:text-white font-bold text-sm text-blue-grayish">Title</p>
          <input
            value={state.title}
            onChange={e => dispatch({ type: "SET_TITLE", payload: e.target.value })}
            className="dark:bg-blue-mid p-2 rounded-md border border-blue-grayish w-full placeholder:text-sm dark:text-white"
            type="text"
            placeholder="e.g. Take coffee break"
          />
        </div>
  
        {/* Description Textarea */}
        <div className="flex flex-col justify-center items-start w-full gap-2">
          <p className="dark:text-white font-bold text-sm text-blue-grayish">Description</p>
          <textarea
            value={state.description}
            onChange={e => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
            className="dark:bg-blue-mid px-3 py-6 align-text-top text-start rounded-md border border-blue-grayish w-full placeholder:text-sm dark:text-white"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </div>
  
        {/* Subtasks */}
        <div className="flex flex-col justify-center w-full items-start gap-4">
          <p className="dark:text-white font-bold text-sm text-blue-grayish">Subtasks</p>
          {state.subtasks?.map((subtask, index) => (
            <React.Fragment key={index}>
              <div className="w-full flex justify-between items-center gap-4">
                <input
                  value={subtask.title}
                  onChange={e => dispatch({ type: "UPDATE_SUBTASK", payload: { title: e.target.value, index: index } })}
                  className="dark:bg-blue-mid border border-blue-grayish p-2 rounded-sm w-full placeholder:text-sm dark:text-white"
                  type="text"
                  placeholder="e.g. Make coffee"
                />
                {subtask.isCompleted && (
                  <Image src="/assets/icon-check.svg" alt="subtask completed" width={20} height={20} />
                )}
                <button onClick={e => dispatch({ type: "DELETE_SUBTASK", payload: index })}>
                  <Image src="/assets/icon-cross.svg" alt="delete subtask" width={20} height={20} />
                </button>
              </div>
            </React.Fragment>
          ))}
          <ButtonAddTask
            className="dark:bg-white bg-opacity-10 text-purple-dark"
            onClick={() => dispatch({ type: "ADD_SUBTASK", payload: { title: "", isCompleted: false, task: state.id, id: 0 } })}
          >
            + Add new Subtask
          </ButtonAddTask>
        </div>
  
        {/* Status Dropdown */}
        <div className="flex flex-col justify-center items-start w-full gap-2">
          <p className="dark:text-white font-bold text-sm text-blue-grayish">Status</p>
          <select
            value={state.status}
            onChange={e => dispatch({ type: "SET_STATUS", payload : {status : e.target.value, columns : columns}})}
            className="dark:bg-blue-mid border border-blue-grayish p-2 rounded-md w-full dark:text-white"
          >
            {statuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
  
        {/* Submit Button */}
        <ButtonAddTask className="text-white" onClick={onSubmit}>
          {title}
        </ButtonAddTask>
      </div>
    );
}

export default TaskForm;
