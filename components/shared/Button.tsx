interface ButtonProps {
    children: React.ReactNode;
    type?: "submit" | "reset" | "button";
    btnBg: string;
    btnTextColor?: string;
    customStyles?: string;
    disabled?: boolean;
    handleClick?: () => void;
}

const Button = ({ 
    children,
    type,
    btnBg,
    btnTextColor,
    customStyles,
    disabled,
    handleClick,
}: ButtonProps) => {
    return (
        <button 
            className={`flex justify-center items-center z-20 ${btnBg} ${btnTextColor} ${customStyles} ${disabled && "opacity-60 cursor-not-allowed"}`}
            disabled={disabled}
            onClick={handleClick}
            type={type}   
        >
            {children}
        </button>
    );
}
 
export default Button;