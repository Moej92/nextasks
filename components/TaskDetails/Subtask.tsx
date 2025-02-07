import { ISubtask } from "@/lib/types";
import { isOverdueSubtask } from "@/lib/utils";
import SubtaskCompletion from "./SubtaskCompletion";

const Subtask = ({ subtask, mainTaskCompletionStatus }: {
    subtask: ISubtask,
    mainTaskCompletionStatus: boolean;
}) => {
    const { title, note, dueDate, createdAt, isCompleted, id } = subtask;
    const isOverDue = isOverdueSubtask(dueDate, isCompleted);

    if(!id) return null;

    return (
        <div className="p-3 lg:text-purple-800 border-purple-900 border-l">
            <p className="text-xs">
                {createdAt && new Date(createdAt).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-start">
                <h3 className="w-[85%] font-semibold">{title}</h3>
                {!mainTaskCompletionStatus && <SubtaskCompletion 
                    subtaskId={id} 
                    isCompleted={isCompleted} 
                />}
            </div>

            <div className="mt-2">
                <p>{note}</p>
            </div>

            <div className="mt-5">
                <p className="font-semibold">Due Date</p>
                <p className={`${isOverDue && "bg-purple-900 text-red-500 py-0.5 px-2 w-fit"}`}>
                    {dueDate === null ? "Flexible Deadline" : new Date(dueDate).toDateString()}
                </p>
            </div>
        </div>
    );
}

export default Subtask;