'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import { FieldError, FieldErrors, FieldValues } from "react-hook-form"
import useProps from "@/app/hooks/useProps"
import useInput from "@/app/components/form/useInput"
import { UseForm } from "@/app/components/form/useForm"



export default function TextField2({
    label,
    placeholder,
    name,
    className,
    require,
    form
}:Readonly<{
    label?:string
    name:string
    placeholder?:string
    className?:string,
    form:UseForm
    require?:boolean|{ message?:string}
}>){
    const inputState = useInput(form,{
        name:name,
        require:require
    })

    const inputContainer = useProps([{
        props:{
            className:styler.textField
        }
    }])

    useEffect(()=>{
        console.log('👹')
        console.log(inputState.error)
        inputContainer.mixClasses(styler.textField_error,{
            exist:[inputState.error]
        },true)
    },[inputState.error])
    

    return <>
        <div {...inputContainer.props}>
            {label &&
                <label htmlFor={name} className={styler.label} >{label}{require && <span>*</span>}</label>
            }
            <input 
                type="text" 
                placeholder={placeholder} 
                className={styler.input} 
                {...inputState.props}
            />
            {inputState.error &&
            <p className={styler.message}>{inputState.error.message}</p>
            }
        </div>
    </>
}