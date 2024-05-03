'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import close_lock from '@/public/svg/close_lock.svg'
import open_lock from '@/public/svg/open_lock.svg'
import { Frame } from "../../ela-components"



export default function PasswordField({
    label,
    placeholder,
    useInput,
    className
}:Readonly<{
    label?:string
    placeholder?:string
    useInput?:any
    className?:string
}>){
    const [visible,setVisible] = useState<boolean>()
    const name = useInput.name

    const changeVisibility = (value:boolean) =>{
        setVisible(!visible)
    }

    return <>
        <div className={styler.passwordField}>
            {label &&
                <label htmlFor={useInput.name} className={styler.label} >{label}</label>
            }
            <input type={visible?"text":"password"} name={useInput.name} placeholder={placeholder} className={styler.input} {...useInput}/>
            
            <Frame
                src={visible?"/svg/open_lock.svg":"/svg/close_lock.svg"} 
                className={styler.image_button} 
                alt={visible?'unlock':'lock'}
                onMouseDown={()=>changeVisibility(true)} 
                onMouseUp={()=>changeVisibility(false)} 
                onDrag={()=>changeVisibility(false)}
            />
            {/* {errors[useInput.name]&&
                <>
                {/*@ts-ignore}
                <p>{errors[useInput.name]?.message}</p>
                </>
            } */}
        </div>
    </>
}
