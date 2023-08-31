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
              <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow ${theme === 'dark' ? 'translate-x-4' : 'translate-x-1'}`}></div>
            </div>
          </label>
        </div>
      );

}

export default ThemeToggle;