import { overdueSubtasks, todaySubtasksFromUpcomingTask, normalizeSubtaskDates } from "@/lib/utils";
import { ISubtask } from "@/lib/types";

import TaskCardTitle from "./TaskCardTitle";
import SubtaskStatus from "./SubtaskStatus";
import TaskCardDueDate from "./TaskCardDueDate";
import TaskCardDeleteAction from "./TaskCardDeleteAction";
import TaskCardEditAction from "./TaskCardEditAction";
import TaskCardCompletion from "./TaskCardCompletionAction";

const TaskCard = ({ task, item }: any) => {
    const { 
        title, 
        note, 
        dueDate, 
        priority, 
        tags, 
        isCompleted, 
        subtasks, 
        id 
    } = task;

    const initialFormData = {
        title,
        note,
        tags,
        dueDate: "",
        priority,
        subtasks: normalizeSubtaskDates(subtasks)
    }

    if(task.dueDate !== null) {
        initialFormData.dueDate = task.dueDate.toISOString().split("T")[0]
    } 

    let overdueSubtasksCount = 0;
    let todaySubtasksCount = 0;
    
    if(item !== "overdue") {
        overdueSubtasksCount = overdueSubtasks(subtasks).length;
    }
        
    if(item === "upcoming") {
        todaySubtasksCount = todaySubtasksFromUpcomingTask(subtasks).length;
    }
    
    const completedSubtasksCount = 
        subtasks.filter((subtask: ISubtask) => subtask?.isCompleted).length;
    
    const completedSubtasksPercentage = 
        completedSubtasksCount ? (completedSubtasksCount / subtasks.length) * 100 : 0;

    return (
        <div className="task-card">
            <TaskCardTitle taskTitle={title} taskId={id} />
            
            {subtasks.length > 0 && <SubtaskStatus 
                completedSubtasksPercentage={completedSubtasksPercentage}
                overdueSubtasksCount={overdueSubtasksCount}
                todaySubtasksCount={todaySubtasksCount}
                priority={priority}
            />
            }
            <TaskCardDueDate dueDate={dueDate} item={item} />

            <TaskCardEditAction initialFormData={JSON.stringify(initialFormData)} taskId={id} />
            <TaskCardDeleteAction taskId={id} />
            <TaskCardCompletion 
                taskId={id} 
                isCompleted={isCompleted} 
                subtasksCount={subtasks.length} 
            />

            <div className={`absolute w-full h-[500px] sm:h-[500px] rounded-full opacity-15 -top-[25%] left-[60%] ${priority === "high" ? "bg-red-500" : "bg-purple"}`}></div>
        </div>
    );
}
 
export default TaskCard;