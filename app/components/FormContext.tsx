'use client'

import React, { createContext, FC, useState } from 'react';

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

    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export default ThemeProvider;
