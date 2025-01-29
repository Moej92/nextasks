"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "../modal";
import EditModal from "../modal/EditModal";

import { normalizeSubtaskDates } from "@/lib/utils";
import TaskCompletionModal from "../modal/TaskCompletionModal";

import DeleteModal from "../modal/DeleteModal";

const TaskCardActions = ({ 
    taskId, formData, isCompleted
}: { 
    taskId: string;
    formData: string;
    isCompleted: boolean;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModaltype] = useState<"edit" | "delete" | "complete" |"">("");

    const initialFormData = JSON.parse(formData);
    initialFormData.subtasks = normalizeSubtaskDates(initialFormData.subtasks);

    const closeModal = () => {
        setModaltype("");
        setIsModalOpen(false);
    }

    const openModal = (type: "edit" | "delete" | "complete") => {
        setModaltype(type);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="w-[10%] flex justify-end pt-1 absolute right-5 z-10">
                <input 
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={() => openModal("complete")}
                    className="accent-purple w-5 h-5"
                />
            </div>
            <div className="absolute bottom-4 right-5 flex gap-2 z-10">
                <button 
                    type="button"
                    className="cursor-pointer bg-blue-500 p-1 rounded-lg hover:scale-105"
                    onClick={() => openModal("edit")}
                >
                    <Image 
                        src="/edit.svg"
                        alt="edit icon"
                        width={20}
                        height={20}
                    />
                </button>

                <button 
                    type="button"
                    className="cursor-pointer bg-red-500 p-1 rounded-lg hover:scale-105"
                    onClick={() => openModal("delete")}
                >
                    <Image 
                        src="/trash.svg"
                        alt="trash icon"
                        width={20}
                        height={20}
                    />
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    modalType === "edit" 
                    ? "Edit Task" 
                    : modalType === "delete"
                    ? "Delete Task"
                    : isCompleted ? "Reopen Task" : "Complete Task"
                }
                btnColor={modalType === "delete" ? "bg-red-500" : "bg-purple"}
            >
                {modalType === "edit" && (
                    <EditModal 
                        taskId={taskId}
                        initialFormData={initialFormData}
                        closeEditModal={closeModal}
                    />
                )}
                {modalType === "delete" && (
                    <DeleteModal
                        taskId={taskId}
                        closeModal={closeModal}
                    />
                )}
                {modalType === "complete" && (
                    <TaskCompletionModal
                        taskId={taskId}
                        isCompleted={isCompleted}
                        subtasksLength={initialFormData.subtasks.length}
                        closeModal={closeModal}
                    />
                )}
            </Modal>
        </>
    );
}
 
export default TaskCardActions;