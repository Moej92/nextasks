"use client";

import { useState } from "react";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { ITaskFormProps } from "@/lib/types";

const TaskForm = ({ 
    userId, taskId, initialFormData, formAction, formLabel, closeEditModal
}: ITaskFormProps) => {

    console.log(initialFormData)
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState("");

    const pathname = usePathname();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
        const { name, value } = e.target;
        
        if(index === undefined) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => {
                const updatedSubtasks = prev.subtasks.map((subtask, i) =>
                    i === index ? { ...subtask, [name]: value } : subtask
                );
                return { ...prev, subtasks: updatedSubtasks };
            });
        }
    };

    const addSubtask = () => setFormData(prev => {
        const { subtasks } = prev;
        return {
            ...prev,
            subtasks: [...subtasks, {title: "", note: "", dueDate: "", isCompleted: false}]
        }
    })

    const removeSubtask = (index: number) => {
        const newSubtasks = formData.subtasks.filter((_, i) => i !== index);
    setFormData(prev => ({
        ...prev,
        subtasks: newSubtasks,
    }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("Please wait...")

        try {
            const result = await formAction(formData, userId || taskId, pathname);
            console.log("r: ", result);
            setMessage(result.message);

            if(pathname === "/my-tasks/new") {
                setTimeout(() => {
                    router.push("/");
                }, 500)
            } else {
                console.log("path: ", pathname)
                setTimeout(() => closeEditModal?.(), 500);
            }
            
        } catch(error: any) {
            setMessage(error.message);
        }
        
    }

    return (
        <form 
            onSubmit={handleSubmit}
            method="POST"
            className="sm:max-w-[700px] mx-auto lg:mx-0 mt-4"    
        >

            <div className="form-element">
                <label htmlFor="title" className="text-lg">Title: *</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="e.g., Design homepage layout"
                    className="form-input input-shadow"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-element">
                <label htmlFor="note">Note:</label>
                <input 
                    type="text" 
                    id="note" 
                    name="note" 
                    placeholder="Add details or notes about the task (optional)"
                    value={formData.note}
                    onChange={handleChange}
                    className="form-input input-shadow" 
                />
            </div>

            <div className="form-element">
                <label htmlFor="tags">Tags:</label>
                <div className="relative">
                    <input 
                        type="text" 
                        id="tags" 
                        name="tags" 
                        className="form-input input-shadow pl-10"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="e.g., work, design, personal"
                    />

                    <label htmlFor="tags" className="absolute top-0 h-full w-8 flex justify-center bg-purple rounded-tr-2xl">
                        <Image 
                            src="/hash.svg"
                            alt="hash icon"
                            width={17}
                            height={17}
                        />
                    </label>
                </div> 
            </div>

            <div className="flex gap-3">

                <div className="flex flex-col w-[50%]">
                    <label htmlFor="due-date">Due Date:</label>
                    <input 
                        type="date" 
                        id="due-date" 
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="form-input input-shadow py-0.5" 
                    />
                </div>

                <div className="flex flex-col w-[50%]">
                    <label htmlFor="priority">Priority</label>
                    <select 
                        name="priority" 
                        id="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="form-input input-shadow"
                    >
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            <Subtasks 
                subtasks={formData.subtasks}
                handleChange={handleChange}
                removeSubtask={removeSubtask}
            />

            <p>{message}</p>

            <div className="flex items-center gap-3">
                {
                    formData.subtasks.every(subtask => subtask.title.trim()) && (
                        <button 
                            type="button" 
                            onClick={addSubtask}
                            className="text-purple-100 flex justify-center w-full bg-purple-900 items-center p-2"
                        >
                            Add Subtask

                            <span className="relative left-1.5">
                                <Image 
                                    src="/add.svg"
                                    alt="add icon"
                                    width={20}
                                    height={20}
                                />
                            </span>
                            
                        </button>
                    )
                }
                <button type="submit" className="p-2 my-1 rounded-sm w-full bg-purple text-purple-100">
                    {formLabel}
                </button>

            </div>

            
        </form>
    );
}

{/* Subtasks */}
function Subtasks({ subtasks, handleChange, removeSubtask }: {
    subtasks: { title: string; note: string; dueDate: string; isCompleted: boolean }[];
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    removeSubtask: (
        index: number
    ) => void;
}) {

    return (
        <div className="my-5">
            <div className="my-5">
            {subtasks.map((subtask, index) => {
                return (
                    <fieldset
                        key={`subtask-${index}`} 
                        className="subtask-fieldset mt-5 relative"
                        disabled={subtask.isCompleted}
                    >
                        <legend 
                            className="px-2 py-1 bg-purple-900 text-purple-100"
                        >
                            Subtask {index + 1}
                        </legend>

                        <div className="mt-3">
                            <label className="">Title:</label>
                            <input 
                                type="text"
                                name="title"
                                className="form-input input-shadow"
                                value={subtask.title}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Enter subtask title here"
                                required
                            />
                        </div>

                        <div className="mt-3">
                            <label className="">Note:</label>
                            <input 
                                type="text"
                                name="note"
                                className="form-input input-shadow"
                                value={subtask.note}
                                onChange={(e) => handleChange(e, index)}
                                placeholder="Enter subtask Note here"
                            />
                        </div>

                        <div className="mt-3">
                            <label className="">Due Date:</label>
                                <input 
                                    type="date"
                                    name="dueDate"
                                    value={subtask.dueDate}
                                    onChange={(e) => handleChange(e, index)}
                                    className="form-input input-shadow"
                                />
                            
                        </div>

                        {
                            subtask.isCompleted 
                            ? <span className="absolute bg-purple-900 text-purple-100 text-xs py-0.5 px-2 rounded-full flex top-0 right-5">
                                Completed
                            </span>
                            : <button
                                type="button" 
                                className="absolute bg-purple-900 rounded-full flex justify-center items-center top-0 right-5 hover:scale-105"
                                onClick={() => removeSubtask(index)}
                            >
                                <Image 
                                    src="/remove.svg"
                                    alt="remove icon"
                                    width={27}
                                    height={27}
                                />
                            </button>
                            
                        }
                        
                    </fieldset>
                )
            })}
            </div>
        
        </div>
    )
}
 
export default TaskForm;