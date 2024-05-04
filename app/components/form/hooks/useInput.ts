'use client'

import { error } from "console"
import { useEffect, useRef, useState } from "react"
import { UseForm } from "./useForm"

interface InputParams{
    name:string,
    value?:string,
    require?:boolean|{
        message?:string
    },
    pattern?:{
        value:RegExp
        message?:string
    },
    otherValidation?:(values:string)=>string|undefined
}

export interface UseInput{
    name:string
    value:string
    container:{
        props:{[key: string]: any;}
    },
    input:{
        props:{[key: string]: any;}
        
    },
    error:{
        type:string
        message:string
    }|void
}

export default function useInput(form:UseForm,params:InputParams){
    const [value,setValue] = useState<string>()
    const [error,setError] =useState<{
        type:string
        message:string|undefined
    }>()
    const [touched,setTouched] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const validateValue = () =>{
            if(params.require){
                if(value==undefined || value == ''){
                    setError({
                        type:'require',
                        message:(typeof params.require != 'boolean')?params.require.message:'Este campo requerido'
                    })
                    return
                }
            }
            if(params.pattern){
                if(!value?.match(params.pattern.value)){
                    setError({
                        type:'pattern',
                        message:(params.pattern.message)?params.pattern.message:'Regex Error'
                    })
                    return
                }
            }
            if(params.otherValidation){
                if(value){
                    const result = params.otherValidation(value)
                    if(result){
                        setError({
                            type:'custom',
                            message:result
                        })
                        return
                    }
                }
            }
            setError(undefined)
    }

    const onSubmit = () =>{
        
    }

    const valueChanged = (value:string|void) =>{
        if(value){
            setValue(value)
        }
        else{
            if(inputRef.current){
                setValue(inputRef.current.value)
            }
        }
    }

    useEffect(()=>{
        form.setInput({[params.name]:validateValue})
        if(touched){
            validateValue()
        }
    },[value])

    useEffect(()=>{
        if(touched){
            validateValue()
        }
    },[!value,touched])

    useEffect(()=>{
        if(params.value){
            if(inputRef.current){
                inputRef.current.value=params.value
                valueChanged(params.value)
            }
        }
    },[])

    return {
        name:params.name,
        value:value,
        props:{
            name:params.name,
            ref:inputRef,
            onChange:()=>{valueChanged()},
            onBlur:()=>{setTouched(true)}
        },
        error:error
    }
}