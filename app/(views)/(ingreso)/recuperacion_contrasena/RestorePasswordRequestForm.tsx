'use client'

import check from '@/public/svg/check.svg'


import styler from './page.module.sass'
import { logIn } from '../../../api/auth/log_in' 
import { PasswordField,TextField,Submit } from '@/ela-form'
import {useForm} from '@/ela-hooks'
import Form from '@/app/components/form/Form'
import FormError from '@/app/components/form/FormError'
import { Frame } from '@/app/components/ela-components'
import RestorePasswordRequestAction from '@/app/api/auth/restore_password_request'


export default function RestorePasswordRequestForm({}:Readonly<{}>){
    const form = useForm()

    return <>
        {form.response.status == 'ok' &&
            <div className={styler.sendMessage_div}>
                <Frame
                    src={check}
                    alt={"check"}
                    className={styler.check_svg}
                    contain
                />
                
                <h4>Correo enviado correctamente</h4>
                <p>Puede cerrar esta pestaña</p>
            </div>
        }
        <div className={styler.restoreRequestForm_div}>
            <h3>Recuperación de contraseña</h3>
            <p>Ingresa tu correo, verificaremos tu estado en el sistema y de inmediato te enviaremos un código de recuperación.</p>
            <Form 
                className={styler.restoreRequest_form} 
                form = {form}
            >
                <TextField
                    label='Correo'
                    name='email'
                    require
                    pattern={{
                        value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message:'El correo no tiene un formato valido'
                    }}
                    form={form}
                />
                <FormError form={form}/>
                <Submit
                    action={RestorePasswordRequestAction} 
                    className={styler.restoreRequest_submit}
                    form={form}
                >
                    Enviar
                </Submit>
            </Form>
        </div>
        
    </>
}
