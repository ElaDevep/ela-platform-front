'use client'

import { stat } from "fs"
import { DispatchWithoutAction, useEffect, useReducer, useState } from "react"
import useInput, { UseInput } from "./useInput"


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
}

class Form{
    inputs:{[key:string]:() => void}|undefined
}

const reducer = (state:{[key:string]:any},action:useFormAction) =>{
    let returnState:{[key:string]:any} = state 
    switch(action.type){
        case 'setInput':
            if(action.input){
                state = Object.assign(state,{...action.input})
            }

    }
    return state
}

export default function useForm(){
    const [inputs,setInputs] = useReducer(reducer,new Form())
    const [reRender,makeReRender] = useState({})

    const onSubmit =()=>{
        for(let input in inputs){
            console.log(inputs[input])
            inputs[input].onSubmit()
        }   
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
        console.log(inputs)
    },[inputs])

    return {inputs,setInput,onSubmit}
}