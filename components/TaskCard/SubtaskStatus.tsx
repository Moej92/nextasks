const SubtaskStatus = ({
    completedSubtasksPercentage,
    overdueSubtasksCount,
    todaySubtasksCount,
    priority
}: {
    completedSubtasksPercentage: number;
    overdueSubtasksCount: number;
    todaySubtasksCount: number;
    priority: string;
}) => {
    return (
        <div className="mb-4">
            <div className={`rounded-sm relative h-5`}>
                <div className={`absolute top-0 left-0 h-full w-full opacity-35 ${priority === "high" ? "bg-red-500" : "bg-purple-500"}`}></div>
                <div
                    style={{ width: `${completedSubtasksPercentage}%`}} 
                    className={`absolute h-full top-0 left-0 ${priority === "high" ? "bg-red-500" : "bg-purple-500"}`}
                >
                    <p className="px-2 relative z-10 text-sm text-purple-100">
                        {completedSubtasksPercentage}%
                        
                    </p>
                </div>
            </div>
            {overdueSubtasksCount > 0 && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                    {overdueSubtasksCount} Overdue Subtask{overdueSubtasksCount > 1 ? "s" : null}
                </p>
            )}

            {todaySubtasksCount > 0 && (
                <p className="text-red-500 text-xs sm:text-sm font-medium">
                        {todaySubtasksCount} Subtask{todaySubtasksCount > 1 ? "s" : null} Due Today
                </p>
            )}
        </div>
    );
}
 
export default SubtaskStatus;