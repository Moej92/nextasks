import { useState } from "react";

import { updateTaskCompletionStatus } from "@/lib/actions/task.actions";

const TaskCompletionModal = ({ 
    taskId,
    isCompleted,
    subtasksLength,
    closeModal
}: {
    taskId: string;
    isCompleted: boolean;
    subtasksLength: number;
    closeModal: () => void;
}) => {
    const [submitMessage, setSubmitMessage] = useState("");

    const handleTaskCompletion = async () => {
        setSubmitMessage("Please wait...");
        try {
            const result = await updateTaskCompletionStatus(taskId, !isCompleted);
            setSubmitMessage(result.message);
            setTimeout(() => {
                closeModal()
            }, 500)
        } catch(error: any) {
            setSubmitMessage(error.message);
        }

    }

    return (
        <div>
            <p className="mt-5">
                {
                    isCompleted
                    ? "Are you sure you want to reopen this task?"
                    : subtasksLength > 0
                    ? `Completing this task will also mark its ${subtasksLength} subtasks as completed. Are you sure?`
                    : "Are you sure you want to complete this task?"
                }
            </p>

            <button 
                className="mt-4 bg-purple text-purple-100 py-1 px-2 rounded-sm"
                onClick={handleTaskCompletion}
                disabled={submitMessage ? true : false}
            >
                {isCompleted ? "Reopen" : "Complete"}
            </button>
            <span className="text-sm"> {submitMessage}</span>
        </div>
    );
}

export default TaskCompletionModal;