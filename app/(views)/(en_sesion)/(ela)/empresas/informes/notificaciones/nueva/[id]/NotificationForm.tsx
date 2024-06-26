'use client'

import Form from '@/app/components/form/Form'
import styler from './NotificationForm.module.sass'
import { useForm } from '@/app/hooks/ela-hooks'
import { FormError, HiddenField, Submit, TextField } from '@/app/components/form/ela-form'
import TextAreaField from '@/app/components/form/inputs/TextAreaField'
import postNotifications from '@/app/api/notifications/post_notifications'
import { usePageContext } from '@/app/context/PageContext'

export default function NotificationForm({idEnterprise}:Readonly<{idEnterprise:string}>){
    const form = useForm({empresaId:idEnterprise})
    
    return <>
        <Form
            form={form}
            className={styler.newNotification_form}
        >
            <TextField
                label='Asunto'
                name='titulo'
                form={form}
            />
            <TextAreaField
                label='Mensaje'
                name='mensaje'
                form={form}
            />
            <HiddenField 
                form={form}
                name={'empresaId'}
            />
            <FormError form={form} notification/>
            <Submit
                form={form}
                action={postNotifications}
                success={{
                    title:'Notificación creada',
                    message:'Ya estamos poniendo al tanto a la empresa',
                    redirect:'/empresas/informes/notificaciones/'+idEnterprise
                }}
            >Enviar</Submit>
        </Form>
    </>
}