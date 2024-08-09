import { createContext, useContext, useState } from "react"

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

  
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'user')
    const [showSidebar, setShowSidebar] = useState(true)
    const [activeNavLink, setActiveNavLink] = useState('overview')
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    return (
        <StateContext.Provider
            value={{

                mode, setMode,
                showSidebar, setShowSidebar,
                activeNavLink, setActiveNavLink,
                windowSize, setWindowSize,

            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)