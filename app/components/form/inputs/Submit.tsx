'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import useProps from "@/app/hooks/useProps"
import { UseForm } from "../hooks/useForm"
import { useFormState } from "react-dom"
import changing_submit from "@/public/svg/charge_submit.svg"
import changing_submit_w from "@/public/svg/charge_submit_w.svg"
import { Frame } from "../../ela-components"

export default function Submit({
    children,
    className,
    action,
    success,
    disable,
    form,
}:{
    children:React.ReactNode
    className?:string
    disable?:boolean
    action:(prevState: any, formData: FormData)=>Promise<string>
    success?:{title:string,message:string,redirect?:string,function?:()=>any}
    form:UseForm
}){
    const [response,submitAction] = useFormState(action,'')
    const [clicked,setClicked]=useState<boolean>(false)
    const submit = useProps([
        {
            props:{
                className:styler.submit,
                formAction:submitAction,
                onClick:()=>{setClicked(true)}
            }
        },{
            mixClass:className,
            conditions:{
                exist:[className]
            }
        }
    ])
    
    useEffect(()=>{
        submit.set({disabled:true},{
            allTrue:[form.disable,disable,!submit.get('disabled')]
        },true)
    },[form])

    useEffect(()=>{
       //console.log(response)
        if(response){  
            form.setResponse({...JSON.parse(response),success:success})
            setClicked(false)
        }
    },[response])

    return <>
        <button {...submit.props} >
            {(!form.charging && !clicked)?
            <>
                {children}
            </>
            :
            <>
                <img src="/svg/charge_submit.svg" className={styler.submit_charging}/>
            </>
            }
        </button>
    </>
}