import Image from "next/image";

const Notifications = () => {
    return (
        <div className="flex">
            <button className="bg-red-500 rounded-md transition-transform hover:scale-105">
                <Image 
                    src="/bell.svg"
                    alt="bell icon"
                    width={30}
                    height={30}
                    className="p-1 md:w-[34px]"
                />
            </button>
            
        </div>
    );
}
 
export default Notifications;