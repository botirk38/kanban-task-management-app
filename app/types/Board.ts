export interface Board {
    name: string;
    columns: Column[];
    id: string
    user: number
}

export interface Column {
    name: string;
    tasks?: Task[];
    id: string 
    status?: {
        name: string;
        icon?: JSX.Element; 
      };

}

export interface Task {
    id: string;
    columnId: string;
    title: string;
    description: string;
    status: string;
    subtasks?: Subtask[];
    
}

export interface Subtask {
    title: string;
    isCompleted: boolean;
    task: any; 
    id: string;
}
