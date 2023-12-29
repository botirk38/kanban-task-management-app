export interface Board {
    name: string;
    columns: Column[];
    id: number
    user: number
}

export interface Column {
    name: string;
    tasks: Task[];
    id: number; 
    status?: {
        name: string;
        icon?: JSX.Element; 
      };
}

export interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
}

export interface Subtask {
    title: string;
    isCompleted: boolean;
}
