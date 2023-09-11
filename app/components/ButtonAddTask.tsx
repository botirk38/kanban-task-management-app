import { ButtonProps } from "../types/Button";


export const ButtonAddTask: React.FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false, // You can set default values here
    className = '',
    type = 'button',
    ...rest
}) => {

    return (
        <button
            className={`bg-purple-dark  font-semibold  w-full p-3 rounded-3xl ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
}

