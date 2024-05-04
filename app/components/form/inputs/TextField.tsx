'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import { FieldError, FieldErrors, FieldValues } from "react-hook-form"
import useProps from "@/app/hooks/useProps"



export default function TextField({
    label,
    placeholder,
    name,
    className
}:Readonly<{
    label?:string
    name?:string
    placeholder?:string
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
                <label htmlFor={name} className={styler.label} >{label}</label>
            }
            <input type="text" placeholder={placeholder} className={styler.input} name={name}/>
            
            
        </div>
    </>
}