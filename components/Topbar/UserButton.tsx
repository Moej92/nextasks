"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signOutAction } from "@/lib/actions/auth";

interface User {
    name: string;
    email: string;
    image: string;
  };
  

const UserButton = ({ name, email, image }: User) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    })

    return (
        <div 
            className="relative lg:hidden z-20" 
        >
            <Image 
                src={image}
                alt="profile image"
                width={30}
                height={30}
                className="rounded-md cursor-pointer sm:w-[34px] transition-transform hover:scale-105"
                onClick={() => setIsMenuOpen(prev => !prev)}
            />

            
            <div className={`absolute right-0 bg-purple-900 transition-all ${isMenuOpen ? "scale-1 translate-y-0 translate-x-0 opacity-1" : "scale-0 -translate-y-12 translate-x-28 opacity-0"} overflow-hidden rounded-md p-3`}
                ref={menuRef}    
            >

                <p>{name}</p>
                <p className="text-sm text-blue-100">{email}</p>

                <form action={signOutAction}>
                    <button type="submit" className="leftbar-link mt-5 text-left">
                        <Image 
                            src="/logout.svg"
                            alt="logout icon"
                            width={30}
                            height={30}
                        />
                        <span>LOGOUT</span>
                    </button>
                </form>
            </div>

            
        </div>
    );
}
 
export default UserButton;