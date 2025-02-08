import Image from "next/image";
import Searchbar from "./Searchbar";
import UserButton from "./UserButton";
import Link from "next/link";
import Search from "./Search";
import Notifications from "./Notifications";

const Topbar = async ({ 
    name, email, image, id
}: {
    name: string;
    email: string; 
    image: string;
    id: string;
}) => {
    return (
        <section className="topbar">

            <h1 className="text-2xl sm:text-3xl flex">
                NExTASks
            </h1>
            
            <div className="flex gap-2 items-center w-full justify-end">
                <div className="md:w-[80%] md:mr-6 max-w-[550px]">
                    <Search userId={id}/>
                </div>
                
                <Notifications />

                <div className="ml-5">
                    <UserButton name={name} email={email} image={image} />
                    <Link
                        href="/my-tasks/new" 
                        className="hidden bg-blue-500 lg:flex justify-center rounded-md">
                        <Image 
                            src="/add.svg"
                            alt="add icon"
                            width={30}
                            height={30}
                            className="w-[34px]"
                        />
                    </Link>
                </div>
                
            </div>

            
        </section>
    );
}
 
export default Topbar;