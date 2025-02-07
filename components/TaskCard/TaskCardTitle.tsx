import Link from "next/link";

const TaskCardTitle = ({ taskTitle, taskId }: { 
    taskTitle: string; 
    taskId: string;
}) => {
    return (
        <h3 className="task-card-title">
            <Link 
                href={`/my-tasks/${taskId}`}
                className="hover:text-blue-500 relative z-10"
            >
                {taskTitle}
            </Link>
        </h3>
    );
}
 
export default TaskCardTitle;