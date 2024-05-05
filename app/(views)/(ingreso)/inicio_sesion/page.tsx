'use client'

import { BreakPoint, Frame } from '@/app/components/ela-components'

import styler from './page.module.sass'

//imágenes
import ela_logotipo_w from '@/public/svg/logotipo_ela_white.svg'
import ela_logotipo_d from '@/public/svg/logotipo_ela_dark.svg'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'

import { useEffect, useState } from 'react'
import useProps from '@/app/hooks/useProps'
import LogInForm from './LogInForm'
import axios from 'axios'
import { axiosAPI } from '@/app/api/axiosAPI'


export default function LogIn(){

    const move_div = useProps([
        {
            props:{className:styler.front_div}
        }
    ])

    const test_api = async()=>{
        await axiosAPI.post('/auth/login',{
            email:'admin@gmail.com',
            password:'contraseña123'
        })
        .then((res)=>{
            console.log(res)
        })
    }

    const goToLogIn=()=>{
        move_div.mixClasses(styler.goToLogIn)
    }

    useEffect(()=>{
        console.log('👻')
        test_api()
    },[])
    
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
                    onClick={()=>{goToLogIn()}}
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
                <LogInForm/>
            </div>
            </div>
        </BreakPoint>
    </>
}