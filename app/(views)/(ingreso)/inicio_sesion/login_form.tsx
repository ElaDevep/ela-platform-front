'use client'

import styler from './page.module.sass'
import { useFormState } from 'react-dom'


import { logInAction } from './action' 
import { PasswordField,TextField,Submit } from '@/ela-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {useProps,useForm} from '@/ela-hooks'
import Form from '@/app/components/form/Form'
import {DevTool} from '@hookform/devtools'
import TextField2 from '@/app/components/form/inputs/TextField2'


const initialState:APIResponse={
    status:'unknown',
    data:''
}

interface formData{
    username:string,
    email:string,
    password:string
}


export default function LogInForm({}:Readonly<{}>){
    const [response,formAction] = useFormState(logInAction,initialState)
    const form = useForm()
    

    useEffect(()=>{
        console.log(response)
        if(response.status == 'error'){
            //formProps.mixClasses(styler.erro_form)
        }
        else{
            //formProps.set({className:className})
        }
    },[response])


    useEffect(()=>{
        console.log(form)
    })


    return <>
        <Form 
            className={styler.logIn_form} 
            action={logInAction} 
            response={response}
            submit = {form.onSubmit}
        >
            <TextField2 
                label='Correo'
                name='email'
                require
                form={form}
            />
            <TextField2 
                label='Nombre'
                name='name'
                require
                form={form}
            />
            <PasswordField 
                label='Contraseña'
                name='password'
            />
            <Submit action={formAction} className={styler.logIn_submit}>Ingresar</Submit>
            <Link href={'/blogs'} className={styler.guest_link}>Entrar como invitado</Link>
        </Form>
    </>
}
