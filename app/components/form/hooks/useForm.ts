'use client'

import { stat } from "fs"
import { Dispatch, DispatchWithoutAction, SetStateAction, act, useEffect, useReducer, useState } from "react"
import useInput, { UseInput } from "./useInput"
import { useFormState } from "react-dom"
import { usePageContext } from "@/app/context/PageContext"
import { useRouter } from "next/navigation"


interface FormInput{
    [key:string]:{
        value:string|undefined
        onSubmit:() => void
        error:{
            type:string
            message:string|undefined
        }|undefined
    }
}

interface useFormAction{
    type:string
    input?:FormInput
    assign?:{[key:string]:any}
}

export interface UseForm{
    inputs: {
        [key: string]: any;
    }
    onSubmit:(e:Event)=>any
    setInput:(input:FormInput) => void
    setResponse:(response:APIResponse)=>any
    response:APIResponse
    charging:boolean
    disable:boolean
    defaultValues?:{[key:string]:any}
}

class Form{
    inputs:{[key:string]:() => void}|undefined
}

const initialState:APIResponse & SuccessAction={
    status:'unknown',
    data:'',
    code:0,
    success:undefined
}


const inputReducer = (state:{[key:string]:any},action:useFormAction) =>{
    switch(action.type){
        case 'setInput':
            if(action.input){
                state = Object.assign(state,{...action.input})
            }

    }
    return state
}

export default function useForm(values?:{[key:string]:any}){
    const [inputs,setInputs] = useReducer(inputReducer,new Form())
    const [reRender,makeReRender] = useState({})
    const [charging,setChanging] = useState<boolean>(false)
    const [response,setResponse] = useState<APIResponse & SuccessAction>(initialState)
    const {setLastAction} = usePageContext()
    const [disable,setDisable] = useState<boolean>(false)

    const router = useRouter()

    const onSubmit =(e:Event)=>{
        setChanging(true)
        for(let input in inputs){
            inputs[input].onSubmit()
            if(inputs[input].error){
                e.preventDefault()
                setDisable(true)
                return
            }
        } 
        setDisable(false)
    }

    const get = (name:string)=>{
        console.log(inputs[name])
        return inputs[name]
    }

    const setInput = (input:FormInput) =>{
        setInputs({
            type:'setInput',
            input:input
        })
        for(let i in input){
            if(input[i].error!=undefined){
                setDisable(true)
            }
            else{
                setDisable(false)
            }
        }
        makeReRender({})
    }

    useEffect(()=>{
        if(response){
            setChanging(false)
            if(response.status == 'ok' && response.success){
                if(response.success.redirect){
                    // console.log('🦅')
                    // console.log(response.success.redirect)
                    router.push(response.success.redirect)
                }
                if(response.success.message && response.success.title){
                    setLastAction({
                        type:'right',
                        ...(response.success)?response.success:{}
                    })
                }
                makeReRender({})
            }
        }
    },[response])
    
    useEffect(()=>{
        //console.log(inputs)
    },[inputs])


    return {inputs,setInput,onSubmit,get,setResponse,response,charging,disable,defaultValues:values}
}