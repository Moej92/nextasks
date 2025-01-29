import NavLinks from "./NavLinks";
import Image from "next/image";
import { auth } from "@/auth";
import { signOutAction } from "@/lib/actions/signout";

const Leftbar = async () => {
    const session = await auth();

    const user = session?.user || {};

    return (
        <nav className="leftbar">
            <div className="px-2 py-4 flex items-center border-b border-purple">
                <div className="w-[20%]">
                    <Image 
                        src={user.image || "/task.svg"}
                        alt="profile image"
                        width={35}
                        height={35}
                        className="rounded-sm"
                    />
                </div>

                <div className="w-[90%]">
                    <p className="">{user.name}</p>
                    <p className="text-xs text-blue-100 break-words w-full">{user.email}</p>
                </div>
            </div>
            

            <ul className="flex flex-col py-5 px-2 gap-2 h-full w-full">
                <NavLinks linkBarType="left"/>
                <form action={signOutAction} className="mt-auto w-full">
                    <button type="submit" className="leftbar-link text-left">
                        <Image 
                            src="/logout.svg"
                            alt="logout icon"
                            width={35}
                            height={35}
                        />
                        <span>LOGOUT</span>
                    </button>
                </form>
            </ul>
        </nav>
    );
}
 
export default Leftbar;