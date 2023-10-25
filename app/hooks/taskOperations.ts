import { useCallback } from "react"
import { Task, Board} from "../types/Board";

interface TaskOperations {
    currentBoard: Board | null;
    setCurrentBoard: (board: Board) => void;
    selectedTask?: Task | null;
    setSelectedTask?: (task: Task) => void;
    setTaskOpen?: (isOpen: boolean) => void;
    onClose?: () => void;
}

const useTaskOperations = ({currentBoard, setCurrentBoard, selectedTask, setSelectedTask, setTaskOpen, onClose} : TaskOperations) => {

    const openTask = useCallback((task: Task) => {
        setSelectedTask?.(task);
        setTaskOpen?.(true);
    }, [setSelectedTask, setTaskOpen]);

    const addTask = useCallback((newTask: Task) => {
        if(currentBoard){
            const updatedBoard = {...currentBoard};

            const columnIndex = currentBoard.columns.findIndex(column => column.name === newTask.status);
            onClose?.();

            if(columnIndex !== -1){
                updatedBoard.columns[columnIndex].tasks.push(newTask);
                setCurrentBoard(updatedBoard);
            } else {
                console.error(`No column found with the name ${newTask.status}`);
            }

        } else {
            console.error("No current board");
        }
    }, [currentBoard, setCurrentBoard, onClose]);

    const handleStatusChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        if (currentBoard && selectedTask) {
            const updatedSelectedTask = { ...selectedTask, status: event.target.value };
    
            const oldColumnIndex = currentBoard.columns.findIndex(column => column.tasks.includes(selectedTask));
            
            if (oldColumnIndex !== -1) {
                const updatedBoard = { ...currentBoard };
    
                updatedBoard.columns[oldColumnIndex].tasks = updatedBoard.columns[oldColumnIndex].tasks.filter(task => task !== selectedTask);
    
                const newColumnIndex = currentBoard.columns.findIndex(column => column.name === updatedSelectedTask.status);
                
                if (newColumnIndex !== -1) {
                    updatedBoard.columns[newColumnIndex].tasks.push(updatedSelectedTask);

                } else {
                    console.error(`No column found with the name ${updatedSelectedTask.status}`);
                }
    
                setCurrentBoard(updatedBoard);
                setSelectedTask?.(updatedSelectedTask);
            } else {
                console.error("Selected task not found within the current board.");
            }
        } else {
            console.error("No task selected or no current board.");
        }
    },[currentBoard, selectedTask, setCurrentBoard, setSelectedTask]);
    

    const toggleSubtaskCompleted = useCallback((subtaskIndex: number) => {
        if (currentBoard && selectedTask && selectedTask.subtasks[subtaskIndex]) {
          const updatedSelectedTask = { ...selectedTask, subtasks: [...selectedTask.subtasks] };
      
          updatedSelectedTask.subtasks[subtaskIndex].isCompleted = !updatedSelectedTask.subtasks[subtaskIndex].isCompleted;
      
          const taskIndex = currentBoard.columns.findIndex(column => column.tasks.includes(selectedTask));
      
          if(taskIndex !== -1) {
            const updatedBoard = { ...currentBoard };
            updatedBoard.columns[taskIndex].tasks = updatedBoard.columns[taskIndex].tasks.map(task => task === selectedTask ? updatedSelectedTask : task);

      
            setCurrentBoard(updatedBoard);
            setSelectedTask?.(updatedSelectedTask);
          } else {
            console.error("Selected task not found within the current board.");
          }
        } else {
          console.error("Invalid subtask index provided or no task selected.");
        }
      }, [currentBoard, selectedTask, setCurrentBoard, setSelectedTask]);

      return { openTask, handleStatusChange, toggleSubtaskCompleted, addTask};




}

export default useTaskOperations;