'use client'

import { error } from "console"
import { RefObject, useEffect, useRef, useState } from "react"
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
    otherValidation?:(values:string)=>{
        type:string,
        message:string
    }|undefined
    depended?:Array<string>
}

export interface UseInput{
    name:string
    value:string|undefined
    props:{[key: string]: any;}
    error:{
        type:string
        message:string|undefined
    }|void
}

//export function useInput<InputType = HTMLInputElement>(form:UseForm|undefined,params:InputParams):UseInput

export default function useInput<InputType>(form:UseForm|undefined,params:InputParams){
    const [value,setValue] = useState<string>()
    const [error,setError] =useState<{
        type:string
        message:string|undefined
    }>()
    const [touched,setTouched] = useState<boolean>(false)
    const inputRef = useRef<InputType extends {value:string} ? InputType: HTMLInputElement>(null)
    const [reRender,makeReRender] = useState({})

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
                        setError(result)
                        return
                    }
                }
            }
            setError(undefined)
    }

    

    const valueChanged = (value:string|void|undefined) =>{
        if(value){
            setValue(value) 
        }
        else{
            if(inputRef.current){
                setValue(inputRef.current.value)
            }
        }
    }

    const resetInput = () => {
        setValue(undefined)
        if(inputRef.current){
            inputRef.current.value=''
        }
    }

    useEffect(()=>{
        makeReRender({})
    },[error])

    const setIntoForm = () =>{
        if(inputRef.current && form){
            form.setInput({[params.name]:{
                onSubmit:validateValue,
                value:inputRef.current.value,
                error:error
            }})
        }
    }

    useEffect(()=>{
        if(inputRef.current && form){
            form.setInput({[params.name]:{
                onSubmit:validateValue,
                value:inputRef.current.value,
                error:error
            }})
        }
    },[error])

    useEffect(()=>{
        if(touched){
            validateValue()
        }
        else{
            if(inputRef.current && form){
                form.setInput({[params.name]:{
                    onSubmit:validateValue,
                    value:inputRef.current.value,
                    error:error
                }})
            }
        }
    },[value])

    useEffect(()=>{
        if(touched){
            validateValue()
        }
    },[!value,touched])
    
    useEffect(()=>{
        if(inputRef.current){
            if(params.value){
                inputRef.current.value=params.value
                valueChanged(params.value)
            }
            else if(form){
                if(form.defaultValues){
                    if(form.defaultValues[params.name]){
                        inputRef.current.value=form.defaultValues[params.name]
                        valueChanged(form.defaultValues[params.name])
                    }
                }
            }
            else{
                valueChanged(inputRef.current.value)
            }
        }
    },[])


    return {
        name:params.name,
        value:value,
        props:{
            name:params.name,
            id:params.name,
            ref:inputRef,
            onChange:()=>{
                valueChanged()
            },
            onBlur:()=>{
                setTouched(true);
                setIntoForm()
            }
        },
        error:error,
        reset:resetInput
    }
}