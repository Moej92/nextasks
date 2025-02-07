"use client";

import { useState } from "react";
import ConfirmOverlay from "./ConfirmOverlay";
import { updateTaskCompletionStatus } from "@/lib/actions/task.actions";

const TaskCardCompletion = ({ 
    taskId, 
    isCompleted,
    subtasksCount
}: { 
    taskId: string; 
    isCompleted: boolean;
    subtasksCount: number;
}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const overlayText = isCompleted 
    ? "Are you sure you want to reopen this task?"
    : subtasksCount > 0
    ? `Completing this task will also mark its ${subtasksCount} subtasks as completed. Are you sure?`
    : "Are you sure you want to complete this task?"

    const overlayButtonText = isCompleted ? "Reopen" : "Complete";

    const handleCompletion = async () => {
        setLoading(true);
        await updateTaskCompletionStatus(taskId, !isCompleted);
        setLoading(false);
        setShowConfirm(false);
    }

    return (
        <>
            <input 
                type="checkbox" 
                className="absolute right-4 top-4 w-5 h-5 accent-purple z-10 hover:border-2"
                checked={isCompleted}
                onChange={() => setShowConfirm(true)}
            />

            <ConfirmOverlay 
                showConfirm={showConfirm} 
                onClose={() => setShowConfirm(false)}
                description={overlayText}
                confirmAction={handleCompletion}
                confirmActionText={overlayButtonText}
                confirmBgColor="bg-purple"
                confirmTextColor="text-purple-100"
                loading={loading}
                
            />
        </>
    );
}
 
export default TaskCardCompletion;