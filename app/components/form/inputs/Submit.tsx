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
    form,
}:{
    children:React.ReactNode
    className?:string
    action:(prevState: any, formData: FormData)=>Promise<string>
    success?:{title:string,message:string,redirect?:string}
    form:UseForm
}){
    const [response,submitAction] = useFormState(action,'')
    const submit = useProps([
        {
            props:{
                className:styler.submit,
                formAction:submitAction
            }
        },{
            mixClass:className,
            conditions:{
                exist:[className]
            }
        }
    ])

    const changeImg = useProps([
        {
            props:{
                className:styler.submit_charging
            }
        }
    ])

    useEffect(()=>{
        if(response){   
            form.setResponse({...JSON.parse(response),success:success})
        }
    },[response])

    return <>
        <button {...submit.props}>
            {!form.charging ?
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