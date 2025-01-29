"use client";

import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ linkBarType }: { linkBarType: string }) => {
    const pathname = usePathname();

    return (
        <>
            {navLinks.map((item) => {
                const { label, link, icon } = item;

                const active = 
                    (link !== "/tasks/new-task" && pathname === link) 
                    || (link !== "/tasks/new-task" && pathname.includes(link) && link.length > 1);

                return label !== "New Task" && (
                    <li key={label} className="w-full">
                        <Link
                            href={link}
                            className={`${linkBarType === "left" ? "leftbar-link" : "bottombar-link"} ${pathname === link && "bg-purple"} ${active && "bg-purple"}`}
                        >
                            <Image 
                                src={icon}
                                alt={label}
                                width={35}
                                height={35}
                            />
                            {label}
                        </Link>
                    </li>
                )
            })}
        </>
)}
    
 
export default NavLinks;