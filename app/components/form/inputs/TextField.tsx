'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import { FieldError, FieldErrors, FieldValues } from "react-hook-form"
import useProps from "@/app/hooks/useProps"



export default function TextField({
    label,
    placeholder,
    useInput,
    errors,
    className
}:Readonly<{
    label?:string
    errors:FieldErrors<FieldValues>
    placeholder?:string
    useInput:any
    className?:string
}>){
    const input = useProps([
        {
            props:{className:styler.textField}
        }
    ])
    

    return <>
        <div {...input.props}>
            {label &&
                <label htmlFor={useInput.name} className={styler.label} >{label}</label>
            }
            <input type="text" placeholder={placeholder} className={styler.input} {...useInput}/>
            {errors[useInput.name]&&
                <>
                {/*@ts-ignore*/}
                <p>{errors[useInput.name]?.message}</p>
                </>
            }
            
        </div>
    </>
}