import Link from "next/link";

import { 
    overdueSubtasks, 
    todaySubtasksFromUpcomingTask
} from "@/lib/utils";

import TaskCardActions from "./TaskCardActions";

const TaskCard = ({ task, item }: any) => {
    const { 
        title,
        note,
        dueDate, 
        priority,
        tags, 
        isCompleted, 
        subtasks, 
        subtaskCount, 
        id
    } = task;

    const initialFormData = {
        title,
        note,
        tags,
        dueDate: "",
        priority,
        subtasks
    }

    if(task.dueDate !== null) {
        initialFormData.dueDate = task.dueDate.toISOString().split("T")[0]
    } 

    const overdueSubtasksCount = item !== "overdue" && overdueSubtasks(subtasks).length;
    const todaySubtasks = item === "upcoming" && todaySubtasksFromUpcomingTask(subtasks);

    const completedSubtasksCount = subtasks.filter((subtask: any) => subtask?.isCompleted).length;
    const completedSubtasksPercentage = completedSubtasksCount 
    ? (completedSubtasksCount / subtasks.length) * 100
    : 0;

    return (
        <div className="bg-purple-100 p-4 rounded-sm relative flex flex-col overflow-hidden">
            <div className="flex justify-between align-center relative z-10">
                <h3 className="sm:text-lg sm:leading-6 font-medium text-ellipsis text-nowrap overflow-hidden text-purple-800 w-[80%] border-b-2 pb-1 mb-1 border-purple-800 hover:text-blue-500">
                    <Link 
                        href={`/my-tasks/${id}`}
                        className=""
                    >
                        {title}
                    </Link>
                </h3>
            </div>
            
            {subtaskCount > 0 && (
                <div className="mb-2">
                    <div className={`w-[80%] bg-white rounded-sm relative`}>
                        <p className="px-2 relative z-10 text-sm text-purple-800">
                            {completedSubtasksPercentage}%
                            
                        </p>
                        <div
                            style={{ width: `${completedSubtasksPercentage}%`}} 
                            className={`absolute h-full top-0 left-0 bg-red-500 opacity-30`}
                        >
                        </div>
                    </div>
                    {
                        overdueSubtasksCount !== false 
                        && overdueSubtasksCount > 0 && (
                            <p className="text-red-500 text-xs sm:text-sm font-medium">
                                {overdueSubtasksCount} Overdue Subtask{overdueSubtasksCount > 1 ? "s" : null}
                            </p>
                        )}
                    {
                        todaySubtasks && todaySubtasks?.length > 0 && (
                            <p className="text-red-500 text-xs sm:text-sm font-medium">
                                 {todaySubtasks.length} Subtask{todaySubtasks.length > 1 ? "s" : null} Due Today
                            </p>
                        )
                    }
                </div>
            )}

            <div className="font-medium text-sm lg:text-base mt-auto">
                <p className="text-purple-800">Due Date</p>
                <p className={`relative z-10 ${overdueSubtasksCount || priority === "high" || item === "overdue" ? "text-red-500" : "text-purple-500"}`}>
                    {new Date(dueDate).toDateString()}
                </p>
            </div>
            

            {tags && (
                <div className="mt-auto items-end z-10 w-[70%]">
                    <p 
                        className="text-sm font-semibold text-blue-500 mt-5"
                    >
                        {tags.split(", ").map((tag: string) => "#" + tag.trim()).join(", ")}
                    </p>
                </div>
            )}
            
            <TaskCardActions 
                taskId={id}
                formData={JSON.stringify(initialFormData)}
                isCompleted={isCompleted}
            />


            <div className={`absolute w-full h-[300px] sm:h-[300px] rounded-full opacity-15 top-[45%] left-[40%] ${priority === "high" || overdueSubtasksCount || item === "overdue" ? "bg-red-500" : "bg-purple"}`}></div>

            {/* <div className={`absolute w-full h-[250px] sm:h-[300px] rounded-full opacity-15 -top-[150%] -left-[40%] ${priority === "high" ? "bg-red-500" : "bg-purple"}`}></div> */}
        </div>
    );
}
 
export default TaskCard;