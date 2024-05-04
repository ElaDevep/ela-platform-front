'use client'

import { useForm } from 'react-hook-form'
import styler from './page.module.sass'
import { useFormState } from 'react-dom'


import { logInAction } from './action' 
import { PasswordField,TextField,Submit } from '@/ela-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useProps from '@/app/hooks/useProps'
import Form from '@/app/components/form/Form'
import {DevTool} from '@hookform/devtools'


const initialState:APIResponse={
    status:'unknown',
    data:''
}


export default function LogInForm({}:Readonly<{}>){
    const form = useForm()
    const {register,formState,control} = form
    const {errors} = formState
    const [response,formAction] = useFormState(logInAction,initialState)

    

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
        console.log(errors) 
    })

    return <>
        <input {...register('username',{
                required:{
                    value:true,
                    message:':B'
                }
            })}/>
        <Form className={styler.logIn_form} action={logInAction} response={response}>
            
            <TextField 
                label='Correo'
                useInput={register('email',{
                    required:{
                        value:true,
                        message:':v'
                    },
                    pattern:{
                        value:/^.*@+.*$/,
                        message: '>:v'
                    }
                })} 
                errors={errors}
            />
            <PasswordField 
                useInput={register('password',{
                    required:{
                        value:true,
                        message:':v'
                    }
                })} 
                label='Contraseña'
            />
            <Submit action={formAction} className={styler.logIn_submit}>Ingresar</Submit>
            <Link href={'/blogs'} className={styler.guest_link}>Entrar como invitado</Link>
        </Form>
    </>
}
