"use client";

import Image from "next/image";
import Button from "../shared/Button";
import { PulseLoader } from "react-spinners";
import { useRef, useEffect } from "react";

const ConfirmOverlay = ({ 
    description, 
    showConfirm, 
    onClose, 
    confirmAction,
    confirmActionText,
    loading,
    confirmBgColor,
    confirmTextColor,
}: { 
    description: string;
    showConfirm: boolean; 
    onClose: () => void;
    confirmAction: () => void;
    confirmActionText: string;
    loading: boolean;
    confirmTextColor: string,
    confirmBgColor: string,
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    })

    return (
        <div
            ref={overlayRef} 
            className={`task-card-overlay ${showConfirm ? "translate-x-0 scale-100" : "-translate-x-[100%] scale-0"}`}>
            <div className="flex gap-4 items-start justify-between">
                <p className="w-[80%] leading-5">
                    {description}
                </p>
                <Button
                    btnBg="bg-purple-800"
                    customStyles="p-0.5 rounded-sm"
                    handleClick={onClose}
                >
                    <Image 
                        src="/close.svg"
                        alt="close icon"
                        width={18}
                        height={18}
                    />
                </Button>
            </div>

            <div className="flex gap-4 items-center mt-auto">
                <Button
                    btnBg={confirmBgColor}
                    btnTextColor={confirmTextColor}
                    customStyles="py-0.5 px-3 w-fit"
                    handleClick={confirmAction}
                    disabled={loading}
                >
                    {confirmActionText}  
                </Button>
                
                <PulseLoader 
                    size={7}
                    loading={loading}
                    color="#564665"
                />
            </div>
            
        </div>
    );
}
 
export default ConfirmOverlay;