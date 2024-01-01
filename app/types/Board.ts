export interface Board {
    name: string;
    columns: Column[];
    id: number;
    user: number
}

export interface Column {
    name: string;
    tasks?: Task[];
    id: number;
    status?: {
        name: string;
        icon?: JSX.Element; 
      };

}

export interface Task {
    id: number;
    columnId: number;
    title: string;
    description: string;
    status: string;
    subtasks?: Subtask[];
    
}

export interface Subtask {
    title: string;
    isCompleted: boolean;
    task: any; 
    id: number;
}
