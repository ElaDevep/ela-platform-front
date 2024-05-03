'use client'

import { BreakPoint, Frame } from '@/app/components/ela-components'

import styler from './page.module.sass'

import ela_logotipo_w from '@/public/svg/logotipo_ela_white.svg'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'

import { logInAction } from './action' 

import { useFormState } from 'react-dom'
import { PasswordField,TextField,Submit } from '@/ela-form'
import { useForm } from 'react-hook-form'
import Link from 'next/link'


const initialState={
    message:''
}

export default function LogIn(){
    const [state,action] = useFormState(logInAction,initialState)
    const form = useForm()
    const {register} = form

    return <>
        <div className={styler.front_div}>
            <div className={styler.welcomeTitle_div}>
                <Frame
                    src={ela_logotipo_w}
                    alt='ela_logotipo'
                    className={styler.ElaLogotipo_img}
                    contain
                />
                <h1>Bienvenido&nbsp;a ELA&nbsp;APP</h1>
                <p>El lugar para ver los beneficios que la sostenibilidad trae a tu empresa.</p>
            </div>
            <div className={styler.logInForm_div}>
                <Frame
                    src={ela_logo}
                    alt='ela_log'
                    className={styler.ElaLogoForm_img}
                />
                <h1>Inicio sesión</h1>
                <form className={styler.logIn_form}>
                    <TextField useInput={register('email')} label='Correo'/>
                    <PasswordField useInput={register('password')} label='Contraseña'/>
                    <Submit action={action} className={styler.logIn_submit}>Ingresar</Submit>
                    <Link href={'/blogs'} className={styler.guest_link}>Entrar como invitado</Link>
                </form>
                {state.message}
            </div>
        </div>
    </>
}