import TaskForm from "@/components/forms/TaskForm";
import { auth } from "@/auth";

import { createNewTask } from "@/lib/actions/task.actions";

import { IUserInfo, ITaskFormData } from "@/lib/types";

const Page = async () => {
    const session = await auth();
    if(!session) return null;
  
    let userInfo: IUserInfo;
  
    const { 
      name, 
      email, 
      image,
      id
    } = session.user as { name: string; email: string; image: string, id: string };
  
    const initialFormData : ITaskFormData = {
        title: "",
        note: "",
        tags: "",
        dueDate: "",
        priority: "medium",
        subtasks: []
    }

    return (
        <div className="page-content-container">
            <h1 className="sm:text-xl text-lg font-light text-purple-100 sm:max-w-[700px] mx-auto lg:mx-0 border-b border-purple-100 pb-2 lg:py-2">New Task</h1>
            <TaskForm 
                userId={id}
                initialFormData={initialFormData} 
                formAction={createNewTask}
                formLabel="Create"
            />
        </div>
    );
}
 
export default Page;