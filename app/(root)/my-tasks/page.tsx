import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth();

    return (
        <div>Tasks</div>
    );
}
 
export default Page;