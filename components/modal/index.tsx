import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
    btnColor: string;
}

const Modal = ({ isOpen, onClose, title, children, btnColor }: ModalProps) => {
    if(!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[#02000544] z-30 flex justify-center items-center">
            <div className="w-[90%] h-fit max-h-[90%] bg-white overflow-auto text-purple-800 p-4 relative max-w-[700px] app-scroll">
                <div className="flex justify-between text-lg border-b-2 pb-2">
                    <h2 className="font-semibold">
                        {title}
                    </h2>
                    <button 
                        className={`${btnColor} p-1.5 rounded-full`} 
                        onClick={onClose}
                    >
                        <Image 
                            src="/close.svg"
                            alt="close icon"
                            width={15}
                            height={15}
                        />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
 
export default Modal;