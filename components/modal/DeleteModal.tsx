import { useState } from "react";

import { deleteTask } from "@/lib/actions/task.actions";

const DeleteModal = ({ 
    taskId, closeModal
}: { 
    taskId: string;
    closeModal: () => void;
}) => {
    const [submitMessage, setSubmitMessage] = useState("");

    const handleDeleteTask = async () => {
        setSubmitMessage("Please wait...");
        try {
            const result = await deleteTask(taskId);
            result.message && setSubmitMessage(result.message);
            setTimeout(() => {
                closeModal()
            }, 500)
        } catch(error: any) {
            setSubmitMessage("Failed to delete");
        }
    }

    return (
        <div>
            <p className="mt-5">Are you sure you want to delete this task? <br />This action cannot be undone.</p>
            <button 
                className="mt-4 bg-red-500 py-1 px-2 rounded-sm"
                onClick={handleDeleteTask}
                disabled={submitMessage ? true : false}
            >
                Confirm Delete
            </button>
            <span className="text-sm"> {submitMessage}</span>
        </div>
    );
}
 
export default DeleteModal;