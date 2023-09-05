import React, { useContext } from 'react';
import { ThemeContext } from './FormContext';

const ThemeToggle = () => {
    const {theme, setTheme} = useContext(ThemeContext);

    const handleToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div>
            <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
                <div className="relative">
                    <input type="checkbox" id="theme-toggle" className="sr-only" checked={theme === 'dark'} onChange={handleToggle} />
                    <div className="block w-[3rem] h-6 bg-purple-dark rounded-full"></div>
                    <div className={`dot absolute top-[0.2rem] left-[0.2rem] left-0 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
            </label>
        </div>
    );
}

export default ThemeToggle;
