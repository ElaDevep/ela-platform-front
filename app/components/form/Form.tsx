'use client'

import { useFormState } from 'react-dom'
import styler from './Form.module.sass'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useProps from '@/app/hooks/useProps'
import { usePageContext } from '@/app/contex/PageContext'

export default function Form({
    className,
    children,
    response,
    success,
    submit
}:Readonly<{
    className:string,
    children:React.ReactNode,
    response?:APIResponse
    success?:{title:string,message:string}
    submit:()=>void
}>){
    const {setLastAction} = usePageContext()
    const formProps = useProps([
        {
            props:{
                className:className
            }
        }
    ])

    useEffect(()=>{
        if(response){
            if(response.status == 'ok'){
                setLastAction({
                    type:'right',
                    ...success
                })
            }
        }
    },[response])

    return <>
        <form {...formProps.props} noValidate onSubmit={submit}>
            {children}
        </form>
    </>
}