import {ButtonProps} from '../types/Button';


export const ButtonPrimary: React.FC<ButtonProps> = ({
    children, 
    onClick, 
    disabled = false, // You can set default values here
    className='', 
    type='button', 
    ...rest
}) => {
    return (
        <button
            className={`bg-purple-dark text-white font-semibold rounded-3xl px-4 py-2 hover:bg-purple-light transition-colors duration-300 ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
}


