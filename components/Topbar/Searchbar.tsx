"use client";

import { useState } from "react";
import { useTransition } from "react";

import Image from "next/image";
import { searchTasks } from "@/lib/actions/task.actions";
import Link from "next/link";
import { ITask } from "@/lib/types";

const Searchbar = ({ 
    userId, 
    showSearchbar,
    hideSearchbar
}: { 
    userId: string;
    showSearchbar: boolean;
    hideSearchbar: () => void; 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [tasks, setTasks] = useState<[]>([]);
    const [isPending, startTransition] = useTransition();

    const handleSearch = async (value: string) => {
        setSearchTerm(value);

        startTransition(() => {
            if(value.trim()) {
                searchTasks(userId, value.trim())
                    .then((results: any) => {
                        setTasks(results);
                    })
            } else {
                setTasks([]);
            }
        })
    }
    
    return (
        <div className={`absolute left-0 w-full z-30 p-2.5 md:p-0 h-full  md:static ${showSearchbar ? "top-0" : "-top-40"}`}>
            <div className="relative h-full">
                <input 
                    id="search"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search tasks by name or tag..."
                    className="rounded-md py-1.5 sm:text-base pl-9 pr-3 text-sm w-full h-full text-purple-900 outline-none focus:shadow-md focus:shadow-blue-500"
                    autoComplete="off"
                />

                <label htmlFor="search" 
                    className="absolute top-0 left-0 h-full flex md:top-0 bg-blue-500 rounded-md">
                    <Image 
                        src="/search.svg"
                        alt="search icon"
                        width={30}
                        height={30}
                        className=""
                    />
                </label>

                <button 
                    className="absolute top-[5px] sm:top-[7px] rounded-full right-2 bg-purple-800 md:hidden"
                    onClick={() => {
                        console.log("click", showSearchbar)
                        hideSearchbar();
                        setSearchTerm("");
                    }}    
                >
                    <Image 
                        src="/close.svg"
                        alt="search icon"
                        width={24}
                        height={24}
                        className="p-1"
                    />
                </button>

                <ul className={`absolute z-30 bg-white text-purple-900 w-full max-h-[300px] md:max-h-[400px] transition-all overflow-y-auto flex flex-col rounded-md mt-0.5 ${searchTerm ? "scale-1 opacity-100" : "scale-0 opacity-0"}`}>
                    {tasks.length > 0 ? tasks.map((task: ITask, i) => {
                        console.log(task)
                        return (
                            <li 
                                key={task.id}
                                className="border-2 flex"
                            >
                                <Link 
                                    href={`/my-tasks/${task.id}`}
                                    className="w-full h-full p-2 hover:bg-purple-800 hover:text-purple-100 text-sm flex justify-between sm:text-base"
                                    onClick={() => {
                                        setSearchTerm("");
                                        hideSearchbar()
                                    }}
                                >
                                    <div>
                                        <h3>{task.title}</h3>

                                        <p className="text-xs sm:text-sm text-blue-500">
                                            {
                                                !task.dueDate
                                                ? "Flexible Deadline" 
                                                : new Date(task.dueDate).toDateString()
                                            }
                                        </p>
                                    </div>
                                    

                                    {task.isCompleted && <Image 
                                        src="/tick.svg"
                                        alt="tick icon"
                                        width={25}
                                        height={25}
                                    /> }
                                </Link>
                            </li>
                        )
                    }) : !isPending && (
                        <p className="p-2">No Results</p>
                    )}
                </ul>
            
            </div>
            
        </div>
    );
}
 
export default Searchbar;