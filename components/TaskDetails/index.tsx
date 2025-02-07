import { getTaskById } from "@/lib/actions/task.actions";
import Subtasks from "./Subtasks";
import Actions from "./Actions";

const TaskDetails = async ({ taskId, userId }: { taskId: string; userId: string; }) => {

    let taskData;
    try {
        taskData = await getTaskById(taskId, userId);
        
    } catch(error: any) {
        return (
            <p>Server error... {error.message}</p>
        )
    }
    
    const { id, title, note, dueDate, priority, tags, isCompleted, subtasks, createdAt } = taskData;

    return (
        <div className="taskDetails-container">

            <div className="flex gap-1 justify-between">
                <h2 className="border-b border-purple-900 w-fit pb-1 text-base lg:text-lg font-semibold text-purple-900">
                    {title}
                </h2>
                
                <p className="text-xs font-light tracking-wider">
                    {new Date(createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="mt-5">
                <h3 className="font-semibold">note</h3>
                <p>{note}</p>
            </div>

            <div className="mt-5 flex justify-between gap-4">
                <div>
                    <h3 className="font-semibold">Due Date</h3>
                    <p className="">{dueDate === null ? "Flexible Deadline" : new Date(dueDate).toDateString()}</p>
                </div>

                <div>
                    <h3 className="font-semibold">Priority</h3>
                    <p className={`${priority === "high" && "text-red-500"} capitalize`}>{priority}</p>
                </div>

                <div>
                    <h3 className="font-semibold">Status</h3>
                    <p className="">{isCompleted ? "Completed" : "Not Completed"}</p>
                </div>

            </div>

            <div className="mt-5">
                <h3 className="font-semibold">Tags</h3>
                <p>
                    {!tags ? "Not Specified" : tags.split(",").map((tag: string) => "#" + tag.trim()).join(", ")}
                </p>
            </div>

            {subtasks.length > 0 && <Subtasks 
                subtasks={subtasks}
                mainTaskCompletionStatus={isCompleted} 
            />}

            <Actions
                taskData={JSON.stringify(taskData)} />

        </div>
    );
}
 
export default TaskDetails;