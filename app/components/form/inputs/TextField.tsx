'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'



export default function TextField({
    label,
    placeholder,
    useInput,
    className
}:Readonly<{
    label?:string
    placeholder?:string
    useInput:any
    className?:string
}>){
    const name:string = useInput.name

    //console.log(useInput)

    return <>
        <div className={styler.textField}>
            {label &&
                <label htmlFor={useInput.name} className={styler.label} >{label}</label>
            }
            <input type="text" placeholder={placeholder} className={styler.input} {...useInput}/>
            {/* {errors[useInput.name]&&
                <>
                {/*@ts-ignore}
                <p>{errors[useInput.name]?.message}</p>
                </>
            } */}
            
        </div>
    </>
}