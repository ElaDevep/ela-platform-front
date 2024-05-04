'use client'

import { BreakPoint, Frame } from '@/app/components/ela-components'

import styler from './page.module.sass'

//imagenes
import ela_logotipo_w from '@/public/svg/logotipo_ela_white.svg'
import ela_logotipo_d from '@/public/svg/logotipo_ela_dark.svg'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'

import { logInAction } from './action' 

import { useFormState } from 'react-dom'
import { PasswordField,TextField,Submit } from '@/ela-form'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import useProps from '@/app/hooks/useProps'
import { useEffect, useState } from 'react'


const initialState={
    message:''
}

export default function LogIn(){
    const [state,action] = useFormState(logInAction,initialState)
    const form = useForm()
    const [reRender,makeReRender] = useState<{}>()
    const {register} = form
    const [wentToLogIn,goingToLogIn] = useState<boolean>()

    const move_div = useProps([
        {
            props:{className:styler.front_div}
        }
    ])


    const goToLogIn=(recall:boolean)=>{
        move_div.mixClasses(styler.goToLogIn)
        makeReRender({})
    }

    useEffect(()=>{

    },[wentToLogIn])
    
    return <>
        <BreakPoint
            className={styler.vertical_relation}
            element={<div/>}
            relation={[4,5]}
            maxWidth={750}
        >
            <div {...move_div.props}>
            <div className={styler.welcomeTitle_div}>
                <Frame
                    src={ela_logotipo_w}
                    darkSrc={ela_logotipo_d}
                    alt='ela_logotipo'
                    className={styler.ElaLogotipo_img}
                    contain
                />
                <h1>Bienvenido&nbsp;a ELA&nbsp;APP</h1>
                <p>El lugar para ver los beneficios que la sostenibilidad trae a tu empresa.</p>
                <button 
                    onClick={()=>{goToLogIn(true)}}
                    className={styler.toLogIn_button}
                >
                    Saber más
                </button>
            </div>
            <div className={styler.logInForm_div}>
                <Frame
                    src={ela_logo}
                    darkSrc={ela_logo_w}
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
        </BreakPoint>
    </>
}