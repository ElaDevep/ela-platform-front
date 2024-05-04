'use client'

import { useFormState } from 'react-dom'
import styler from './Form.module.sass'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useProps from '@/app/hooks/useProps'

const initialState:APIResponse={
    status:'unknown',
    data:''
}

export default function Form({
    action,
    className,
    response,
    children
}:Readonly<{
    action:(prevState: any, formData: FormData)=>Promise<APIResponse>,
    response:APIResponse
    className:string,
    children:React.ReactNode
}>){
    //const [response,formAction] = useFormState(action,initialState)
    const formProps = useProps([
        {
            props:{
                className:className
            }
        }
    ])
    


    useEffect(()=>{
        if(response.status == 'error'){
            formProps.mixClasses(styler.error_form)
        }
        else{
            formProps.set({className:className})
        }
    },[response])

    return <>
        <form {...formProps.props} noValidate>
            {children}
        </form>
    </>
}