import { ObjectId } from "mongoose";

import { ISubtask } from "./types";

const today = new Date();
today.setHours(0, 0, 0, 0);

interface Subtask {
    dueDate: Date;
    isCompleted: boolean;
}

export const isOverdueSubtask = (dueDate: Date | null, isCompleted: boolean) => {
    return dueDate !== null && !isCompleted && dueDate < today;
}

export const overdueSubtasks = (subtasksArray: Subtask[]) => {
    return subtasksArray.filter(
        subtask => (subtask.dueDate && subtask.dueDate < today) && !subtask.isCompleted 
    )
}

export const todaySubtasksFromUpcomingTask = (subtasksArray: ISubtask[]) => {
    return subtasksArray.filter(subtask => 
        subtask.dueDate?.toLocaleDateString() === today.toLocaleDateString() 
        && !subtask.isCompleted
    )
}

export const normalizeSubtaskDates = (subtasks: Subtask[]) => {
    return subtasks.map(subtask => ({
        ...subtask,
        dueDate: subtask.dueDate 
            ? subtask.dueDate instanceof Date 
                ? subtask.dueDate.toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
                : new Date(subtask.dueDate).toISOString().split("T")[0] // Handle ISO string case
            : "", // Set to empty string if null
    }));
};