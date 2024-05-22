'use client'

import React, { useState, useEffect } from "react";
import styler from './PageContext.module.sass'
import useProps from "../hooks/useProps";
import getCurrentUser from "../api/auth/get_current_user";
import logOut from "../api/auth/log_out";
import { usePathname, useRouter } from "next/navigation";
import role_access from '@/app/jsons/role_access.json';
import { Notification } from "../components/ela-components";
import path from "path";
import {setCurrentUser as setCurrentUserCookie} from "../api/auth/set_current_user";

interface UsePageContext{
    setLastAction:((action:LastAction)=>void)|undefined
    lastAction:LastAction|undefined
}

interface RoleAccess{
    views:{[key:string]:View}
    roles:{
        [key:string]:string[]
    }
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
    // const lastActionProps = useProps([{
    //     props:{className:styler.lastAction}
    // }])
    const [currentUser,setCurrentUser] = useState<CurrentUser>()
    const [userAccess,setUserAccess] = useState<View[]>()
    const router = useRouter()
    const pathname = usePathname()


    const validateLocalUser = async () =>{
        await getCurrentUser()
        .then((res)=>{
            if(res){
                if(res.data){
                    setCurrentUser({
                        shortName:(res.data.name.split(' '))[0]+' '+(res.data.lastname.split(' '))[0],
                        name:res.data.name,
                        lastName:res.data.lastname,
                        email:res.data.email,
                        id:res.data._id,
                        img:res.data.imgProfile,
                        role:res.data.role,
                        mobile:res.data.mobile,
                        businessName: res.data.bussinesName
                    })
                }
            }
        })
    }

    const reSetCurrentUser = () =>{
        setCurrentUserCookie()
    }

    const CloseSession = async () =>{
        //console.log('Salido')
        await logOut()
        setCurrentUser(undefined)
        router.push('/inicio_sesion')
    }

    useEffect(()=>{
        const AllRoleAccess:RoleAccess =  role_access
        if(currentUser){
            // setLastAction({
            //     type:'right',
            //     title:'Bienvenido!',
            //     message:'Sesión iniciada correctamente'
            // })
            if(currentUser.role){
                setUserAccess((AllRoleAccess.roles[currentUser.role]).map((access:string)=>{
                    return AllRoleAccess.views[access]
                }))
            }
        }
    },[currentUser])


    useEffect(()=>{
        if(currentUser==undefined){
            validateLocalUser()
        }
        if(pathname.includes('home')){
            if(window){
                window.location.reload()
            }
        }
    })

    useEffect(()=>{
    },[lastAction])

    useEffect(()=>{
        //CloseSession()
    },[])

    const value = {
        setLastAction,
        lastAction,
        currentUser,
        userAccess,
        CloseSession,
        reSetCurrentUser
    }
    
    return <PageContext.Provider value={value} {...props}>
        {children}
        <Notification />
    </PageContext.Provider>
}

export const usePageContext = () => {
    const context = React.useContext(PageContext);
    if (!context) {
        throw new Error("No existe el contexto");
    }
    return context;
};
