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
                className:className,
                noValidate:true,
                onSubmit:form?.onSubmit,
                method:'POST'
            }
        }
    ])

    useEffect(()=>{
        if(response){
            alert('/:v')
            if(response.status == 'ok'){
                setLastAction({
                    type:'right',
                    ...success
                })
            }
        }
    },[response])

    return <>
        <form {...formProps.props}>
            {children}
        </form>
    </>
}