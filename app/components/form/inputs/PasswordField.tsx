'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import close_lock from '@/public/svg/close_lock.svg'
import open_lock from '@/public/svg/open_lock.svg'
import { Frame } from "../../ela-components"



export default function PasswordField({
    label,
    placeholder,
    name,
    className
}:Readonly<{
    label?:string
    placeholder?:string
    name?:string
    className?:string
}>){
    const [visible,setVisible] = useState<boolean>()

    const changeVisibility = (value:boolean) =>{
        setVisible(!visible)
    }

    return <>
        <div className={styler.passwordField}>
            {label &&
                <label htmlFor={name} className={styler.label} >{label}</label>
            }
            <input type={visible?"text":"password"} name={name} placeholder={placeholder} className={styler.input}/>
            
            <Frame
                src={visible?"/svg/open_lock.svg":"/svg/close_lock.svg"} 
                className={styler.image_button} 
                alt={visible?'unlock':'lock'}
                onMouseDown={()=>changeVisibility(true)} 
                onMouseUp={()=>changeVisibility(false)} 
                onDrag={()=>changeVisibility(false)}
            />
        </div>
    </>
}
