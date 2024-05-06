'use client'

import { useFormState } from 'react-dom'
import styler from './Form.module.sass'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import useProps from '@/app/hooks/useProps'
import { usePageContext } from '@/app/context/PageContext'
import { UseForm } from './hooks/useForm'
import { useRouter } from 'next/navigation'




export default function Form({
    className,
    children,
    form
}:Readonly<{
    className:string,
    children:React.ReactNode,
    form:UseForm
}>){
    const [charging,setCharged] = useState<boolean>()

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


    return <>
        <form {...formProps.props}>
            {children}
        </form>
    </>
}

