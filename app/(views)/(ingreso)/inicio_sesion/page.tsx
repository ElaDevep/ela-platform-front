'use client'

import { Frame } from '@/app/components/ela-components'

import styler from './page.module.sass'

import ela_logotipo_w from '@/public/svg/logotipo_ela_white.svg'
import ela_logo from '@/public/svg/logo_ela.svg'
import ela_logo_w from '@/public/svg/logo_ela_white.svg'

import { logInAction } from './action' 

import { useFormState } from 'react-dom'

const initialState={
    message:''
}

export default function LogIn(){
    const [state,action] = useFormState(logInAction,initialState)

    return <>
        <div className={styler.front_div}>
            <div className={styler.welcomeTitle_div}>
                <Frame
                    src={ela_logotipo_w}
                    alt='ela_logotipo'
                    className={styler.ElaLogotipo_img}
                    cover
                />
                <h1>Bienvenido&nbsp;a ELA&nbsp;APP</h1>
                <p>El lugar para ver los beneficios que la sostenibilidad trae a tu empresa.</p>
            </div>
            <div className={styler.logInFrom_div}>
                <Frame
                    src={ela_logo}
                    alt='ela_log'
                    darkSrc={ela_logo_w}
                    className={styler.ElaLogoForm_img}
                />
                <h1>Inicio sesión</h1>
                <form action={action}>
                    <input type='text'/>
                    <input type="text" />
                    <button>Ingresar</button>
                    <button>Entrar como invitado</button>
                </form>
                {state.message}
            </div>
        </div>
    </>
}