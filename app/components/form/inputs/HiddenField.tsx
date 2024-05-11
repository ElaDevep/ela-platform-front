'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import { FieldError, FieldErrors, FieldValues } from "react-hook-form"
import useProps from "@/app/hooks/useProps"
import useInput from "@/app/components/form/hooks/useInput"
import { UseForm } from "@/app/components/form/hooks/useForm"



export default function HiddenField({
    name,
    form
}:Readonly<{
    name:string
    form:UseForm
}>){
    const inputState = useInput(form,{
        name:name
    })



    return <>
            <input 
                type="hidden"  
                {...inputState.props}
            />
    </>
}