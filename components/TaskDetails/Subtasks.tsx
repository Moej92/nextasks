import { ISubtask } from "@/lib/types";
import Subtask from "./Subtask";

const Subtasks = ({ subtasks, mainTaskCompletionStatus }: {
    subtasks: ISubtask[];
    mainTaskCompletionStatus: boolean;
}) => {
    return (
        <div className="mt-5">
            <h3 className="font-semibold">Subtasks 
                <span className="text-xs text-purple-100 bg-purple-900 ml-2 rounded-full p-1.5"> 
                    {subtasks.length}
                </span>
            </h3>

            <div className="mt-2 flex flex-col gap-3">
                {subtasks.map((subtask) => <Subtask 
                    key={subtask.title} 
                    subtask={subtask} 
                    mainTaskCompletionStatus={mainTaskCompletionStatus}
                />)}
            </div>
        </div>
    );
}
 
export default Subtasks;