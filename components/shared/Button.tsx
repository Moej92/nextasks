

const Button = ({ 
    children,
    btnBg,
    customStyles,
    disabled,
    handleClick,
}: {
    children: React.ReactNode;
    btnBg: string;
    customStyles?: string;
    disabled?: boolean;
    handleClick?: () => void;
}) => {
    return (
        <button 
            className={`flex justify-center items-center ${btnBg} ${customStyles} ${disabled && "opacity-60 cursor-not-allowed"}`}
            disabled={disabled}
            onClick={handleClick}    
        >
            {children}
        </button>
    );
}
 
export default Button;