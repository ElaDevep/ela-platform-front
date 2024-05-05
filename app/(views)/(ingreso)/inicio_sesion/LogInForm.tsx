'use client'

import styler from './page.module.sass'
import { useFormState } from 'react-dom'


import { logInAction } from './action' 
import { PasswordField,TextField,Submit } from '@/ela-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {useProps,useForm} from '@/ela-hooks'
import Form from '@/app/components/form/Form'
import FormError from '@/app/components/form/FormError'
import { title } from 'process'


const initialState:APIResponse={
    status:'unknown',
    data:'',
    code:0
}

interface formData{
    username:string,
    email:string,
    password:string
}


export default function LogInForm({}:Readonly<{}>){
    const [response,formAction] = useFormState(logInAction,'')
    const form = useForm()
    const [onu,setOnu] = useState()

    useEffect(()=>{
        if(response){
            setOnu(JSON.parse(response))
        }
        console.log(response)
    },[response])

    return <>
        <Form 
            className={styler.logIn_form} 
            form = {form}
            response={onu}
            success={{
                title:'Bienvenido!',
                message:'Sesión iniciada correctamente'
            }}
        >
            <TextField
                label='Correo'
                name='email'
                require
                form={form}
            />
            <PasswordField 
                label='Contraseña'
                name='password'
                require
                form={form}
            />
            {/* {<FormError response={JSON.parse(response)} modal={{title:'Error al iniciar sesión'}} />} */}
            <Submit action={formAction} className={styler.logIn_submit}>Ingresar</Submit>
            <Link href={'/blogs'} className={styler.guest_link}>Entrar como invitado</Link>
        </Form>
    </>
}
