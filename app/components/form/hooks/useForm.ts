'use client'

import { stat } from "fs"
import { Dispatch, DispatchWithoutAction, SetStateAction, act, useEffect, useReducer, useState } from "react"
import useInput, { UseInput } from "./useInput"
import { useFormState } from "react-dom"
import { usePageContext } from "@/app/context/PageContext"
import { useRouter } from "next/navigation"


interface useFormAction{
    type:string
    input?:{
        [key:string]:{
            value:string|undefined
            onSubmit:() => void}
    }
    assign?:{[key:string]:any}
}

export interface UseForm{
    inputs: {
        [key: string]: any;
    }
    onSubmit:()=>any
    setInput:(input: {
        [key: string]: {
            value: string|undefined;
            onSubmit: () => void;
        };
    }) => void
    setResponse:(response:APIResponse)=>any
    response:APIResponse
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

export default function useForm(){
    const [inputs,setInputs] = useReducer(inputReducer,new Form())
    const [reRender,makeReRender] = useState({})
    const [actions,setActions] = useState<{[key:string]:FormAction}>()
    const [response,setResponse] = useState<APIResponse & SuccessAction>(initialState)
    const {setLastAction} = usePageContext()
    const router = useRouter()

    const onSubmit =()=>{
        for(let input in inputs){
            //console.log(inputs[input])
            inputs[input].onSubmit()
        }   
    }

    const get = (name:string)=>{
        console.log(inputs[name])
    }

    const setInput = (input:{
        [key:string]:{
            value:string|undefined
            onSubmit:() => void}
    }) =>{
        setInputs({
            type:'setInput',
            input:input
        })
        makeReRender({})
    }

    useEffect(()=>{
        if(response){
            if(response.status == 'ok'){
                setLastAction({
                    type:'right',
                    ...(response.success)?response.success:{}
                })
                router.push('/recuperacion_contrasena')
            }
        }
    },[response])
    
    useEffect(()=>{
        //console.log(inputs)
    },[inputs])

    useEffect(()=>{
        console.log(actions)
    },[actions])

    return {inputs,setInput,onSubmit,get,setResponse,response}
}