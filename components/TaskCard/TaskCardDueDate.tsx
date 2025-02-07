

const TaskCardDueDate = ({ dueDate, item }: { dueDate: Date; item: string }) => {
    return (
        <div className="font-medium text-sm sm:text-base mt-auto flex gap-4">
            <p className="text-purple-800">Due</p>
            <p className={`relative z-10 ${item === "overdue" ? "text-red-500" : "text-purple-500"}`}>
                {new Date(dueDate).toDateString()}
            </p>
        </div>
    );
}
 
export default TaskCardDueDate;