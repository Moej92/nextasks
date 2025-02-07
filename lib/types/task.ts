export interface ITask {
    id: string;
    title: string;
    note?: string;
    dueDate?: string;
    priority?: string;
    tags?: string;
    isCompleted: boolean;
    subtasks?: {title: string, note?: string, dueDate?: string}[] | string; 
}

export interface ITaskFormData {
    title: string;
    note?: string;
    tags?: string;
    dueDate?: string;
    priority?: string;
    subtasks: {title: string, note: string, dueDate: string, isCompleted: boolean}[];
}

export interface ISubtask {
    id: string;
    title: string;
    note: string | null;
    dueDate: Date | null;
    isCompleted: boolean;
    createdAt?: Date;
}

export interface ITaskFormProps {
    userId?: string;
    taskId?: string;
    initialFormData: ITaskFormData;
    formAction: (data: ITaskFormData, userId?: string, pathname?: string) => Promise<any>;
    formLabel: string;
    closeEditModal?: () => void;
}