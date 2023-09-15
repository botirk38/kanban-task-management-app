'use client'

import React, { createContext, FC, useState, useEffect } from 'react';

type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { }
});

type ThemeProviderProps = {
    children: React.ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Create the state here

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;
