"use client";

import Button from "../shared/Button";
import Image from "next/image";
import ConfirmOverlay from "./ConfirmOverlay";
import { useState, useRef, useEffect } from "react";
import { deleteTask } from "@/lib/actions/task.actions";

const TaskCardDeleteAction = ({ taskId }: { taskId: string }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async () => {
        setLoading(true);
        await deleteTask(taskId);
        setLoading(false);
    }

    return (
        <>
            <Button
                btnBg="bg-red-500"
                customStyles="task-card-button"
                handleClick={() => setShowConfirm(true)}
            >
                <Image 
                    src="/trash.svg"
                    alt="trash icon"
                    width={20}
                    height={20}
                />
            </Button>

            <ConfirmOverlay 
                showConfirm={showConfirm} 
                onClose={() => setShowConfirm(false)}
                description="Are you sure you want to delete this task? This action cannot be undone."
                confirmAction={handleDelete}
                confirmActionText="Confirm Delete"
                confirmBgColor="bg-red-500"
                confirmTextColor="text-purple-800"
                loading={loading}
            />
        </>
        
    );
}
 
export default TaskCardDeleteAction;