'use client'

import styler from './page.module.sass'
import { logIn } from '../../../api/auth/log_in' 
import { PasswordField,TextField,Submit } from '@/ela-form'
import {useState } from 'react'
import Link from 'next/link'
import {useForm} from '@/ela-hooks'
import Form from '@/app/components/form/Form'
import FormError from '@/app/components/form/FormError'


export default function LogInForm({}:Readonly<{}>){
    const form = useForm()

    return <>
        <Form 
            className={styler.logIn_form} 
            form = {form}
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
            <FormError form={form}/>
            <Submit
                action={logIn} 
                className={styler.logIn_submit}
                form={form}
                success={{
                    title:'Bienvenido!',
                    message:'Sesión iniciada correctamente',
                    redirect:'/recuperacion_contrasena'
                }}
            >
                Ingresar
            </Submit>
            <Link href={'/blogs'} className={styler.guest_link}>Entrar como invitado</Link>
        </Form>
    </>
}
