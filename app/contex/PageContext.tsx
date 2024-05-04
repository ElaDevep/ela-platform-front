'use client'

import React, { useState, useEffect } from "react";
import styler from './PageContext.module.sass'
import useProps from "../hooks/useProps";

interface UsePageContext{
    setLastAction:((action:LastAction)=>void)|undefined
    lastAction:LastAction|undefined
}


const PageContext = React.createContext<{[key:string]:any}>({});

export function PageProvider({
    props,
    children
}:Readonly<{
    props?:{[key:string]:any},
    children:React.ReactNode
}>){
    const [lastActionShow,setLastActionShow] = useState<LastAction>()
    const lastAction = useProps()

    const value = {
        setLastAction: setLastActionShow,
        lastAction: lastActionShow
    }

    useEffect(()=>{
        lastAction.set({className:styler.lastRightAction},{
            allTrue:[lastActionShow?.type == 'right']
        })
        lastAction.set({className:styler.lastErrorAction},{
            allTrue:[lastActionShow?.type == 'error']
        })
        lastAction.set({className:styler.lastInfoAction},{
            allTrue:[lastActionShow?.type == 'info']
        })
        if(lastActionShow){
            setTimeout(()=>{
                setLastActionShow(undefined)
            },6000)
        }
    },[lastActionShow])


    
    return <PageContext.Provider value={value} {...props}>
        {lastActionShow &&
        <>
            <div {...lastAction.props}>
                <span>{lastActionShow.title}</span>
                <p>{lastActionShow.message}</p>
            </div>
        </>
        }
        {children}
    </PageContext.Provider>
}

export const usePageContext = () => {
    const context = React.useContext(PageContext);
    if (!context) {
        throw new Error("No existe el contexto");
    }
    return context;
};
