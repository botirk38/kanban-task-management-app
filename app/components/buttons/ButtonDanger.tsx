import { ButtonProps } from "@/app/types/Button"

const ButtonDanger: React.FC<ButtonProps> = ({ children,
    onClick,
    disabled = false, 
    className = '',
    type = 'button',
    ...rest}) => {
        return(
            <button 
            className={`bg-red-bright font-semibold  w-full p-3 rounded-3xl ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...rest}
            >
                {children}
            </button>
        )
}

export default ButtonDanger;