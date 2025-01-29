import TaskForm from "../forms/TaskForm";
import { ITaskFormData } from "@/lib/types";

import { editTask } from "@/lib/actions/task.actions";

const EditModal = ({ 
    taskId, initialFormData, closeEditModal
}: { 
    taskId: string;
    initialFormData: ITaskFormData;
    closeEditModal: () => void;
}) => {

    return (
        <TaskForm 
            taskId={taskId}
            initialFormData={initialFormData}
            formAction={editTask}
            formLabel="Update"
            closeEditModal={closeEditModal}
        />
    )
}

export default EditModal;