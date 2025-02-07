import { auth } from "@/auth";

import { getTasksForHomePage } from "@/lib/actions/task.actions";

import Link from "next/link";
import TaskCard from "@/components/TaskCard";

type TasksType = {
  today: any[];
  upcoming: any[];
  overdue: any[];
};

export default async function Home() {
  
  const session = await auth();
  if(!session) return null;

  const { id: userId } = session.user as { id: string };

  // const tasks: TasksType = await getTasksForHomePage(userId);

  const tasks = await getTasksForHomePage(userId);

  if(!tasks.today.length && !tasks.upcoming.length && !tasks.overdue.length) {
    return (
      <div className="page-content-container">
        <h2>No Available Tasks</h2>
        <Link
          href="/tasks/new-task"
          className="bg-purple mt-5 py-2 px-4 rounded-sm"
        >
          Add New Task
        </Link>
      </div>
    )
  }

  return (
    <div className="page-content-container">
      {Object.keys(tasks).map((item) => {
        const tasksItems = tasks[item as keyof TasksType];
        if(tasksItems.length)
        return (
          <div key={item}>
            <h2>{item.toUpperCase()}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 mt-5 mb-10">
              {tasksItems.map((task) => {
                return (
                  <TaskCard 
                    key={task.title} 
                    task={task} 
                    item={item} 
                  />
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}
