export interface Board {
    name: string;
    columns: Column[];
}

interface Column {
    name: string;
    tasks: Task[];
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
