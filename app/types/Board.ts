export interface Board {
    name: string;
    columns: Column[];
    id: string
    user: number
}

export interface Column {
    name: string;
    tasks: Task[];
    id: string 
    status?: {
        name: string;
        icon?: JSX.Element; 
      };

    columnId: string;
}

export interface Task {
    id: string;
    columnId: string;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[] | undefined;
}

export interface Subtask {
    title: string;
    isCompleted: boolean;
    task: any; 
}
