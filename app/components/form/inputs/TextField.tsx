'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import { FieldError, FieldErrors, FieldValues } from "react-hook-form"
import useProps from "@/app/hooks/useProps"
import useInput from "@/app/components/form/hooks/useInput"
import { UseForm } from "@/app/components/form/hooks/useForm"



export default function TextField({
    label,
    placeholder,
    name,
    className,
    require,
    pattern,
    otherValidation,
    form
}:Readonly<{
    label?:string
    pattern?:{
        value:RegExp
        message?:string
    }
    otherValidation?:(values:string)=>string|undefined
    name:string
    placeholder?:string
    className?:string,
    form:UseForm
    require?:boolean|{ message?:string}
}>){
    const inputState = useInput(form,{
        name:name,
        require:require,
        pattern:pattern,
        otherValidation:otherValidation
    })

    const inputContainer = useProps([{
        props:{
            className:styler.textField
        }
    },{
        mixClass:className
    }])

    useEffect(()=>{
        inputContainer.mixClasses(styler.textField_error,{
            exist:[inputState.error]
        },true)
    },[inputState.error])
    

    return <>
        <div {...inputContainer.props}>
            {label &&
                <label htmlFor={name}>{label}{require && <span>*</span>}</label>
            }
            <input 
                type="text" 
                placeholder={placeholder} 
                {...inputState.props}
            />
            {inputState.error &&
            <p className={styler.message}>{inputState.error.message}</p>
            }
        </div>
    </>
}