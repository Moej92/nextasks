"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

import { usePathname } from "next/navigation";

const Bottombar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-purple-900 fixed bottom-0 w-full z-10">
            <ul className="flex justify-between items-center gap-3 p-2 lg:hidden">
                {navLinks.map((item) => {
                    const { label, link, icon } = item;

                    const active = 
                    (link !== "/tasks/new-task" && pathname === link) 
                    || (link !== "/tasks/new-task" && pathname.includes(link) && link.length > 1);

                    return (
                        <li 
                            key={label} 
                            className={`w-[20%]`}>
                            <Link
                                href={link}
                                className={`bottombar-link ${label === "New Task" && "bg-[#99b9ca] text-white"} ${active && "bg-purple"} `}
                            >
                                <Image 
                                    src={icon}
                                    alt={label}
                                    width={30}
                                    height={30}
                                />
                                <span className="hidden sm:block text-xs pt-1">{label}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}
 
export default Bottombar;