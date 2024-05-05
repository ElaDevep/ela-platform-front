'use client'

import { useFormState } from 'react-dom'
import styler from './Form.module.sass'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useProps from '@/app/hooks/useProps'
import { usePageContext } from '@/app/contex/PageContext'
import { UseForm } from './hooks/useForm'

export default function Form({
    className,
    children,
    response,
    success,
    form
}:Readonly<{
    className:string,
    children:React.ReactNode,
    response?:APIResponse
    success?:{title:string,message:string}
    form:UseForm
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
                alert('/:v')
                setLastAction({
                    type:'right',
                    ...success
                })
            }
        }
    },[response])

    return <>
        <form {...formProps.props} noValidate onSubmit={form?.onSubmit}>
            {children}
        </form>
    </>
}