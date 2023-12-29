export interface Board {
    name: string;
    columns: Column[];
    id: string,
}

export interface Column {
    name: string;
    tasks: Task[];
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
