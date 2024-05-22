'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import close_lock from '@/public/svg/close_lock.svg'
import open_lock from '@/public/svg/open_lock.svg'
import { Frame } from "../../ela-components"
import { UseForm } from "../hooks/useForm"
import useInput from "../hooks/useInput"
import useProps from "@/app/hooks/useProps"



export default function PasswordField({
    label,
    placeholder,
    name,
    value,
    className,
    require,
    form,
    pattern,
    otherValidation,
}:Readonly<{
    label?:string
    name:string
    value?:string
    placeholder?:string
    className?:string,
    form:UseForm
    require?:boolean|{ message?:string}
    pattern?:{
        value:RegExp
        message?:string
    }
    otherValidation?:(values:string)=>{
        type:string,
        message:string
    }|undefined
}>){
    const [visible,setVisible] = useState<boolean>()
    
    const inputState = useInput(form,{
        name:name,
        value:value,
        require:require,
        pattern:pattern,
        otherValidation:otherValidation
    })

    const inputContainer = useProps([{
        props:{
            className:styler.passwordField
        }
    },{
        mixClass:className
    }])

    const changeVisibility = (value:boolean) =>{
        setVisible(!visible)
    }

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
            <Frame
                src={visible?"/svg/open_lock.svg":"/svg/close_lock.svg"} 
                className={styler.image_button} 
                alt={visible?'unlock':'lock'}
                onMouseDown={()=>changeVisibility(true)} 
                onMouseUp={()=>changeVisibility(false)} 
                onDrag={()=>changeVisibility(false)}
            />
            <input 
                type={visible?"text":"password"}
                placeholder={placeholder}
                {...inputState.props}
            />
            {inputState.error &&
            <p className={styler.message}>{inputState.error.message}</p>
            }
        </div>
    </>
}
