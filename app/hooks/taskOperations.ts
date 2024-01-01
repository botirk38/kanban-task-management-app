import { useCallback } from "react"
import { Task, Board, Subtask } from "../types/Board";
import debounce from 'lodash/debounce';


interface TaskOperations {
    currentBoard: Board | null | undefined;
    setCurrentBoard: (board: Board) => void;
    selectedTask?: Task | null;
    setSelectedTask?: (task: Task) => void;
    setTaskOpen?: (isOpen: boolean) => void;
    onClose?: () => void;
}

const createTask = async (task: Task, boardId: number, columnId: number) => {

    try {
        const response = await fetch(`/api/boards/${boardId}/columns/${columnId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const createdTask = await response.json();

        return createdTask;

    } catch (err: any) {
        console.error("Error creating task:", err);

    }

}

const postSubtasks = async (boardId: number, columnId: number, taskId: number, subtasks: Subtask[]) => {
    console.log("Task Id : ", taskId);

    try {

        const response = await fetch(`api/boards/${boardId}/columns/${columnId}/tasks/${taskId}/subtasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subtasks)


        });


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const createdSubtasks = await response.json();

        return createdSubtasks;


    } catch (err: any) {
        console.error("Error creating task:", err);
    }


}

const updateSubtask = debounce(async (boardId: number, columnId: number, taskId: number, subtaskId: number, updatedSubtask: Subtask) => {

    try {

        const response = await fetch(`api/boards/${boardId}/columns/${columnId}/tasks/${taskId}/subtasks/${subtaskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedSubtask)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);

        }

        const updatedSubtaskResponse = await response.json();

        return updatedSubtaskResponse;


    } catch (err: any) {

        console.error("Error creating task:", err);

    }
}, 500);


const updateStatus = async (boardId: number, columnId: number, taskId: number, task: Task) => {

    try {

        const response = await fetch(`api/boards/${boardId}/columns/${columnId}/tasks/${taskId}/`, {

            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedTask = await response.json();

        return updatedTask;


    } catch (err: any) {

        console.error("Error creating task:", err);


    }

}

const useTaskOperations = ({ currentBoard, setCurrentBoard, selectedTask, setSelectedTask, setTaskOpen, onClose }: TaskOperations) => {

    const openTask = useCallback((task: Task) => {
        setSelectedTask?.(task);
        setTaskOpen?.(true);
    }, [setSelectedTask, setTaskOpen]);



    const addTask = useCallback(async (newTask: Task) => {
        if (currentBoard) {
            const taskData = { ...newTask, subtasks: undefined };
            console.log("Task Data : ", taskData)
            const createdTask = await createTask(taskData, currentBoard.id!, newTask.columnId!);

            if (createdTask) {

                const updatedSubtasks = newTask.subtasks?.map(subtask => ({
                    ...subtask,
                    task: createdTask.id

                }));

                const createdSubtasks = await postSubtasks(currentBoard.id!, newTask.columnId!, createdTask.id, updatedSubtasks!);
                const updatedTaskWithSubtasks = { ...createdTask, subtasks: createdSubtasks };

                const updatedBoard = { ...currentBoard };
                const columnIndex = currentBoard.columns.findIndex(column => column.id === newTask.columnId);

                if (columnIndex !== -1) {
                    updatedBoard.columns[columnIndex].tasks?.push(updatedTaskWithSubtasks);
                    setCurrentBoard(updatedBoard);
                } else {
                    console.error(`No column found with the ID ${createdTask.columnId}`);
                }
            }

            onClose?.();

        } else {
            console.error("No current board");
        }
    }, [currentBoard, setCurrentBoard, onClose]);



    const handleStatusChange = useCallback(async (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (currentBoard && selectedTask) {
            const newStatus = event.target.value;
            const updatedTaskData = { ...selectedTask, status: newStatus };

            try {
                const updatedTaskResponse = await updateStatus(currentBoard.id!, updatedTaskData.columnId!, selectedTask.id!, updatedTaskData);

                // Update the selected task with the response
                setSelectedTask?.(updatedTaskResponse);

                // Find the old and new column indexes
                const oldColumnIndex = currentBoard.columns.findIndex(column => column.id === selectedTask.columnId);
                const newColumnIndex = currentBoard.columns.findIndex(column => column.name === newStatus);

                // Update the board's columns with the moved task
                if (oldColumnIndex !== -1 && newColumnIndex !== -1) {
                    const updatedBoard = { ...currentBoard };
                    updatedBoard.columns[oldColumnIndex].tasks = updatedBoard.columns[oldColumnIndex].tasks?.filter(task => task.id !== selectedTask.id);
                    updatedBoard.columns[newColumnIndex].tasks?.push(updatedTaskResponse);

                    setCurrentBoard(updatedBoard);
                }
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        } else {
            console.error("No task selected or no current board.");
        }
    }, [currentBoard, selectedTask, setCurrentBoard, setSelectedTask]);



    const toggleSubtaskCompleted = useCallback(async (subtaskIndex: number) => {
        if (currentBoard && selectedTask && selectedTask.subtasks && selectedTask.subtasks[subtaskIndex]) {
            const updatedSelectedTask = { ...selectedTask, subtasks: [...selectedTask.subtasks] };

            updatedSelectedTask.subtasks[subtaskIndex].isCompleted = !updatedSelectedTask.subtasks[subtaskIndex].isCompleted;

            await updateSubtask(currentBoard.id!, selectedTask.columnId!, selectedTask.id!, selectedTask.subtasks[subtaskIndex].id!, updatedSelectedTask.subtasks[subtaskIndex]);

            const taskIndex = currentBoard.columns.findIndex(column => column.tasks?.includes(selectedTask));

            if (taskIndex !== -1) {
                const updatedBoard = { ...currentBoard };
                updatedBoard.columns[taskIndex].tasks = updatedBoard.columns[taskIndex].tasks?.map(task => task === selectedTask ? updatedSelectedTask : task);


                setCurrentBoard(updatedBoard);
                setSelectedTask?.(updatedSelectedTask);
            } else {
                console.error("Selected task not found within the current board.");
            }
        } else {
            console.error("Invalid subtask index provided or no task selected.");
        }
    }, [currentBoard, selectedTask, setCurrentBoard, setSelectedTask]);

    return { openTask, handleStatusChange, toggleSubtaskCompleted, addTask };




}

export default useTaskOperations;
