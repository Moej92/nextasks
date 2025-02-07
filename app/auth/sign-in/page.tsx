import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

import Image from "next/image";

const Page = async () => {

    return (
        <main className="min-h-screen max-w-4xl flex flex-col justify-center items-center p-4 sm:p-6 mx-auto">
            <div className="bg-[#02000555] px-5 sm:px-10 lg:px-20 py-12 rounded-2xl flex flex-col items-center relative z-10">

                <div className="absolute -bottom-16">
                    <Image 
                        src="/logo.png"
                        alt="logo"
                        width={90}
                        height={90}
                        className="rounded-full"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <h1 className="text-2xl sm:text-3xl font-extralight">
                        NexTasks
                    </h1>
                    <div className="w-[1px] h-[50px] bg-purple-100"></div>
                    <p className="text-[#99b9ca] text-sm sm:text-lg font-light w-[145px] sm:w-48">Organize, Collaborate, and Achieve More!</p>
                </div>

                <p className="text-lg sm:text-xl text-white font-extralight max-w-[450px] tracking-wide text-center py-10">Keep track of your tasks and collaborate effortlessly with others</p>

                <div className="flex flex-col items-center sm:flex-row gap-5">
                    <form action={async () => {
                        "use server"
                        await signIn("github",  { redirectTo: "/" });
                    }}>
                        <button type="submit" className="flex items-center gap-2 py-1 px-4 rounded-full bg-white text-purple-900 shadow-inner hover:shadow-purple-900 transition-shadow">
                            <Image 
                                src="/github.svg"
                                alt="github-logo"
                                width={22}
                                height={22}
                            />
                            Continue with Github
                        </button>
                    </form>

                    <form action={async () => {
                        "use server"
                        await signIn("google", { redirectTo: "/" });
                    }}>
                        <button type="submit" className="flex items-center gap-2 py-1 px-4 rounded-full bg-purple-800 text-white shadow-inner hover:shadow-purple-100 transition-shadow">
                            <Image 
                                src="/google.svg"
                                alt="google-logo"
                                width={22}
                                height={22}
                            />
                            Continue with Google
                        </button>
                    </form>
                </div>
                
            </div>

            
        </main>
    );
}
 
export default Page;