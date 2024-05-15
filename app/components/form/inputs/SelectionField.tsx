'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import close_lock from '@/public/svg/close_lock.svg'
import open_lock from '@/public/svg/open_lock.svg'
import { Frame } from "../../ela-components"
import { UseForm } from "../hooks/useForm"
import useInput from "../hooks/useInput"
import useProps from "@/app/hooks/useProps"
import { title } from "process"



export default function SelectionField({
    label,
    name,
    className,
    form,
    require,
    otherValidation,
    options,
    title,
    value,
}:Readonly<{
    label?:string
    name:string
    className?:string,
    options:Array<[string,string]|[string,string,string]>|(()=>Promise<APIResponse>)
    title?:string
    value?:string
    form:UseForm
    require?:boolean|{ message?:string}
    otherValidation?:(values:string)=>{
        type:string,
        message:string
    }|undefined
}>){
    const inputState = useInput<HTMLSelectElement>(form,{
        name:name,
        require:require,
        otherValidation:otherValidation
    })

    const inputContainer = useProps([{
        props:{
            className:styler.selectField
        }
    },{
        mixClass:className
    }])

    const [optionsList,setOptionsList] = useState<Array<{value:string,title:string,complement?:string}>>()

    useEffect(()=>{
        inputContainer.mixClasses(styler.textField_error,{
            exist:[inputState.error]
        },true)
    },[inputState.error])

    const settingOptions = async ()=>{
        let optionsSet:Array<{value:string,title:string}>|undefined 
        if(typeof options == 'object'){
            optionsSet = options.map((op)=>{
                if(op[2]){
                    return {value:op[0],title:op[1],complement:op[2]}
                }
                else{
                    return {value:op[0],title:op[1]}
                }
                
            })
        }
        else if(typeof options == 'function'){
            await options().
            then((res)=>{
                //console.log(res)
                if(typeof res.data=='object' && value && title){
                    optionsSet = res.data.map((op:{[key:string]:any})=>{
                        return {value:op[value],title:op[title]}
                    })
                }
                else{
                    throw 'La data de la respuesta tiene que ser un arreglo'
                }
            })
        }
        if(optionsSet){
            optionsSet.unshift({value:'',title:'Seleccione una opción'})
            setOptionsList(optionsSet)
        }
    }

    useEffect(()=>{
        settingOptions()
    },[])

    return <>
        <div {...inputContainer.props}>
            {label &&
                <label htmlFor={name}>{label}{require && <span>*</span>}</label>
            }
            <select 
                autoComplete="off"
                {...inputState.props}
            >
                {optionsList && 
                    optionsList.map((op,index)=>{
                        return <option key={index} value={op.value}>
                            {op.title}
                        </option>
                    })
                }
            </select>
            {inputState.error &&
            <p className={styler.message}>{inputState.error.message}</p>
            }
        </div>
    </>
}
