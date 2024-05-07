'use client'

import React, { useState, useEffect } from "react";
import styler from './PageContext.module.sass'
import useProps from "../hooks/useProps";
import getCurrentUser from "../api/auth/get_current_user";

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
    const [lastAction,setLastAction] = useState<LastAction>()
    const lastActionProps = useProps()
    const [currentUser,setCurrentUser] = useState<CurrentUser>()


    const validateLocalUser = async () =>{
        if(!currentUser){
            await getCurrentUser()
            .then((res)=>{
                if(res.data){
                    setCurrentUser({
                        name:res.data.name,
                        lastName:res.data.lastname,
                        email:res.data.email,
                        id:res.data._id
                    })
                }
            })
        }

    }

    useEffect(()=>{
        lastActionProps.set({className:styler.lastRightAction},{
            allTrue:[lastAction?.type == 'right']
        })
        lastActionProps.set({className:styler.lastErrorAction},{
            allTrue:[lastAction?.type == 'error']
        })
        lastActionProps.set({className:styler.lastInfoAction},{
            allTrue:[lastAction?.type == 'info']
        })
        if(lastAction){
            setTimeout(()=>{
                setLastAction(undefined)
            },6000)
        }
    },[lastAction])

    useEffect(()=>{
        validateLocalUser()
    })

    const value = {
        setLastAction,
        lastAction,
        currentUser
    }
    
    return <PageContext.Provider value={value} {...props}>
        {lastAction &&
        <>
            <div {...lastActionProps.props}>
                <span>{lastAction.title}</span>
                <p>{lastAction.message}</p>
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