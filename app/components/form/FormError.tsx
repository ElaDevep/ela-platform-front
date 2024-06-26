'use client'

import { useEffect, useState } from 'react'
import styler from './Form.module.sass'
import { title } from 'process'
import { usePageContext } from '@/app/context/PageContext'
import { UseForm } from './hooks/useForm'

export default function FormError({
    form,
    modal,
    messages,
    message,
    notification
}:Readonly<{
    form:UseForm
    modal?:{
        title:string
        message?:string
    }
    notification?:boolean
    message?:string
    messages?:Array<{
        code:number
        title:string
        message:string
    }>
}>){
    const { setLastAction } = usePageContext()
    const [show,setShow] = useState<boolean>()

    useEffect(()=>{
        const response = form.response
        if(form.response.status == 'error'){
            if(messages){
                for(let message of messages){
                    if(message.code == response.code){
                        if(notification){
                            setLastAction({
                                type:'error',
                                title:message.title,
                                message:message.message
                            })
                        }
                        else{
                            setShow(true)
                        }
                    }
                }
            }
            else{
                if(notification){
                    setLastAction({
                        type:'error',
                        title:'Error en el formulario',
                        message: response.data  
                    })
                }
                else{
                    setShow(true)
                }
            }
        }
        else{
            setLastAction(undefined)
            setShow(false)
        }
    },[form.response])
    

    return <>
        {show &&
        <>
        {modal ?
            <>
                <div className={styler.APIerror}>
                    <div className={styler.APIerror_div}>
                        <span>{modal.title}</span>
                        <div>
                            <p>
                                {modal.message ? modal.message :
                                <>
                                {typeof form.response.data == 'string' &&
                                    form.response.data
                                }
                                </>}
                            </p>
                        </div>
                        <button onClick={()=>{setShow(false)}}>Aceptar</button>
                    </div>
                </div>
            </>
        :
            <>
                <p className={styler.APIerror_message}>{message?
                message:
                <>
                {typeof form.response.data == 'string' &&
                    form.response.data
                }
                </>}</p>
            </>}
        </>
        }
    </>
}