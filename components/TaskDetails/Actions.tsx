"use client";

import Image from "next/image";
import Button from "../shared/Button";
import Modal from "../modal";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";

import { ISubtask } from "@/lib/types";
import { normalizeSubtaskDates } from "@/lib/utils";

import { useState } from "react";

const Actions = ({ taskData }: { taskData: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModaltype] = useState<"edit" | "delete" | "">("");

    const closeModal = () => {
        setModaltype("");
        setIsModalOpen(false);
    }

    const openModal = (type: "edit" | "delete") => {
        setModaltype(type);
        setIsModalOpen(true);
    }

    const task = JSON.parse(taskData);

    const initialTaskFormData = {
        title: task.title,
        note: task.note,
        dueDate: "",
        priority: task.priority,
        tags: task.tags,
        subtasks: task.subtasks
    }
    if(task.dueDate !== null) {
        initialTaskFormData.dueDate = new Date(task.dueDate).toISOString().split("T")[0]
    } 
    initialTaskFormData.subtasks = normalizeSubtaskDates(initialTaskFormData.subtasks);

    return (
        <div className="flex justify-between gap-3 mt-3 pt-3 border-t border-purple-900">
            {
                task.isCompleted
                ? <Button 
                    btnBg="bg-white"
                    customStyles="taskDetails-button"
                    disabled={task.subtasks.some((subtask: ISubtask) => !subtask.isCompleted)}
                >
                    <Image 
                        src="/tick.svg"
                        alt="tick icon"
                        width={20}
                        height={20}
                    />
                    Reopen
                </Button>
                : <>
                    <Button 
                        btnBg="bg-white"
                        customStyles="taskDetails-button"
                        handleClick={() => openModal("edit")}
                    >
                        <Image 
                            src="/edit.svg"
                            alt="edit icon"
                            width={20}
                            height={20}
                        />
                        Edit
                    </Button>

                    <Button 
                        btnBg="bg-white"
                        customStyles="taskDetails-button"
                        disabled={task.subtasks.some((subtask: ISubtask) => !subtask.isCompleted)}
                    >
                        <Image 
                            src="/tick.svg"
                            alt="tick icon"
                            width={20}
                            height={20}
                        />
                        Complete
                    </Button>

                    <Button 
                        btnBg="bg-white"
                        customStyles="taskDetails-button"
                        handleClick={() => openModal("delete")}
                    >
                        <Image 
                            src="/trash.svg"
                            alt="trash icon"
                            width={20}
                            height={20}
                        />
                        Delete
                    </Button>
                </>
            }

                <Modal 
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={
                        modalType === "edit" 
                        ? "Edit Task" 
                        : modalType === "delete"
                        ? "Delete Task"
                        : ""
                    }
                    btnColor={modalType === "delete" ? "bg-red-500" : "bg-purple"}
                >
                    {
                        modalType === "edit"
                        ? <EditModal 
                            taskId={task.id}
                            initialFormData={initialTaskFormData}
                            closeEditModal={closeModal}
                        />
                        : modalType === "delete"
                        ? <DeleteModal 
                            taskId={task.id}
                            closeModal={closeModal}
                        />
                        : null
                    }
                </Modal>
            </div>
    );
}
 
export default Actions;