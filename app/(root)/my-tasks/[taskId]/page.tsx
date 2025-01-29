import { auth } from "@/auth";
import TaskDetails from "@/components/TaskDetails";

const Page = async ({ params }: any) => {
    const { taskId } = await params;

    const session = await auth();
    if(!session) return null;
    const { id: userId } = session.user as { id: string };

    return (
        <div className="page-content-container pt-5 lg:pt-7">
            <TaskDetails taskId={taskId} userId={userId} />
        </div>
    );
}
 
export default Page;