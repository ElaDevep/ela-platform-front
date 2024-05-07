'use client'

import check from '@/public/svg/check.svg'

import styler from './page.module.sass'

import {Form, FormError, PasswordField, Submit, TextField, useForm} from '@/ela-form'
import { Frame } from '@/ela-components'

import {RestorePasswordAction} from '@/app/api/auth/resetore_password'

import useProps from '@/app/hooks/useProps'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RestorePasswordForm({token}:Readonly<{token:string}>){
    const form = useForm()


    const [ok,setOk] = useState(false)


    useEffect(()=>{
        //console.log(form)
    },[form])


    const passwordsMatch = (value:string)=>{
        const newPassword = form.inputs.password.value
        if(value != newPassword){
            return {
                type:'differentPassword',
                message:'Las contraseñas no son iguales'
            }
        }
        return undefined
    }

    return <>
        <div className={styler.restorePasswordForm_div}>
            <h3>Recuperación de contraseña</h3>
            <p>A continuación ingresa tu nueva contraseña, recuerda que debe cumplir con los siguientes requisitos:</p>
            <ul className={styler.passwordConditions_list}>
                <li>1 Letra mayúscula</li>
                <li>1 Letra minúscula</li>
                <li>4 Números</li>
                <li>1 Carácter especial</li>
                <li>12 Caracteres en total</li>
            </ul>
            <Form 
                className={styler.restoreRequest_form} 
                form = {form}
            >
                <input type='hidden' value={token} name={'token'}/>
                <PasswordField
                    label='Nueva contraseña'
                    name='password'
                    form={form}
                    require
                    pattern={{
                        value:/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*(?:\d\D*){4,}.*)(?=.*[!@#$%^&(){}*_\[\]]+)[a-zA-Z0-9!@#$%^&*_(){}\[\]]{12,}$/,
                        message:'La contraseña no cumple los requisitos solicitados'
                    }}
                />
                <PasswordField
                    label='Confirmar contraseña'
                    name='confirmPassword'
                    form={form}
                    require
                    pattern={{
                        value:/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*(?:\d\D*){4,}.*)(?=.*[!@#$%^&(){}*_\[\]]+)[a-zA-Z0-9!@#$%^&*_(){}\[\]]{12,}$/,
                        message:'La contraseña no cumple los requisitos solicitados'
                    }}
                    otherValidation={(value)=>(passwordsMatch(value))}
                />  
                <Submit
                    action={RestorePasswordAction} 
                    className={styler.restoreRequest_submit}
                    form={form}
                    disable
                >
                    Enviar
                </Submit>
            </Form>
            {form.response.status == 'ok' && <>
                    <div className={styler.restoredMessage_div}>
                        <Frame
                            src={check}
                            alt={"check"}
                            className={styler.check_svg}
                            contain
                        />
                        <h4>Contraseña restaurada correctamente!</h4>
                        <p>Ya puedes <Link href={'/inicio_sesion'}>iniciar sesion<hr/></Link></p>
                    </div>
                </>
            }
        </div>
    </>
}