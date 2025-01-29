import Topbar from "@/components/Topbar"
import Bottombar from "@/components/shared/Bottombar"
import Leftbar from "@/components/shared/Leftbar"
import { auth } from "@/auth"

export default async function Layout({ 
    children 
}: Readonly<{
    children: React.ReactNode 
}>) {
    // const session = await auth();
    // if(!session) return null;
    
    return (
        <div className="main-container h-full">
            <main className="flex flex-col h-full max-w-[2000px]">
                {/* <Topbar 
                    name={session?.user?.name || ""}
                    email={session?.user?.email || ""}
                    image={session?.user?.image || ""}
                    id={session?.user?.id || ""}
                /> */}
                <div className="lg:flex h-full max-h-full overflow-hidden">
                    {/* <Leftbar /> */}
                    {children}
                    {/* <Bottombar /> */}
                </div>
            </main>
            
        </div>
    )
}