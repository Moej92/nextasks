import { ObjectId } from "mongoose";

export interface ITask {
    _id: ObjectId;
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
    _id?: ObjectId;
    title: string;
    note?: string;
    dueDate: Date;
    isCompleted: boolean;
    createdAt: string;
    subtaskCount?: number;
    id?: string;
}

export interface ITaskFormProps {
    userId?: string;
    taskId?: string;
    initialFormData: ITaskFormData;
    formAction: (data: ITaskFormData, userId?: string, pathname?: string) => Promise<any>;
    formLabel: string;
    closeEditModal?: () => void;
}