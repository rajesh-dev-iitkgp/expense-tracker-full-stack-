/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState("light");

    const ToggleTheme = ()=>{
        setTheme((prev)=>prev === "light" ? "dark" : "light");
    }

    useEffect(()=>{
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme){
            setTheme(savedTheme);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem("theme", theme);
    },[theme]);

    return (
        <ThemeContext.Provider value={{theme, ToggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

