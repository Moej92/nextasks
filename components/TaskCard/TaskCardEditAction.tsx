"use client";

import Image from "next/image";
import Button from "../shared/Button";

import { useState } from "react";
import EditModal from "../modal/EditModal";
import Modal from "../modal";

const TaskCardEditAction = ({ 
    initialFormData, 
    taskId 
}: { 
    initialFormData: string; 
    taskId: string;
}) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Button
                btnBg="bg-blue-500"
                customStyles="task-card-button right-12"
                handleClick={() => setShowModal(true)}
            >
                <Image 
                    src="/edit.svg"
                    alt="edit icon"
                    width={20}
                    height={20}
                />
            </Button>

            <Modal 
                isOpen={showModal}
                onClose={handleCloseModal}
                title="Edit Task"
                btnColor="bg-purple-500"
            >
                <EditModal 
                    taskId={taskId}
                    initialFormData={JSON.parse(initialFormData)}
                    closeEditModal={handleCloseModal}
                />
            </Modal>
        </>
    );
}
 
export default TaskCardEditAction;