"use client";
import { useState } from "react";
import { updateSubtaskCompletionStatus } from "@/lib/actions/task.actions";

const SubtaskCompletion = ({ 
    taskId, 
    isCompleted 
}: { taskId: string, isCompleted: boolean }) => {
    const [loading, setLoading] = useState(false);

    const handleSubtaskCompletion = async () => {
        setLoading(true);
        await updateSubtaskCompletionStatus(taskId, !isCompleted);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        return;
    }

    return (
        <div className="">
            <input 
                type="checkbox" 
                className="w-4 h-4 sm:w-5 sm:h-5 accent-purple"
                checked={isCompleted}
                disabled={loading}
                onChange={handleSubtaskCompletion} 
            />
        </div>
    );
}
 
export default SubtaskCompletion;