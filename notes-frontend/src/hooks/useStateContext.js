import React, { createContext, useContext, useEffect, useState } from 'react'

export const stateContext = createContext()

const getFreshContext = () => {
    if(localStorage.getItem('context') == null)
        localStorage.setItem('context', JSON.stringify([]))
    
    return JSON.parse(localStorage.getItem('context'))
}

export function useStateContext() {
    const {context, setContext} = useContext(stateContext)

    return{
        context,
        setContext,
        updateContext: (oldObj, obj) => {
            context.splice(context.indexOf((obj) => oldObj == obj), 1)
            setContext(context.push(obj))
        },
        resetContext: () => {
            localStorage.removeItem('context')
            setContext(getFreshContext())
        }
    }
}

export default function ContextProvider({children}) {
    const [context, setContext] = useState(getFreshContext())

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(context))
    }, [context])

    return (
        <stateContext.Provider value={{ context, setContext }}>
            {children}
        </stateContext.Provider>
    )
}
