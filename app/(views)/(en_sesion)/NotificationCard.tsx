'use client'

import putNotification from '@/app/api/notifications/put_notifications'
import styler from './NotificationCard.module.sass'
import { useEffect, useState } from 'react'

export default function NotificationCard({current,onlyView}:Readonly<{current?:Notification,onlyView?:boolean}>){
    const [state,setState] = useState<string>()

    useEffect(()=>{
        if(current){
            setState(current.estado)
        }
    },[,current])


    return <>
        <div className={styler.notificationCard_div} >
            {!current ?
            <div className={styler.noSelected_div}>
                <span>Seleccione una notificación de la tabla para ver su previsualización</span>
            </div>
            :
            <>
            <div className={styler.withCurrent_div}>
                <div className={styler['status_'+state]}>
                </div>
                <div className={styler.notificationText_div}>
                    <span>
                        {current.titulo}
                    </span>
                    <p>
                        {current.mensaje}
                    </p>
                    <span className={styler.notificationDate_span}>
                        {current.fecha}
                    </span>
                </div>
                {!onlyView &&
                    <div className={styler[state+"Button_div"]}>
                        <button {...state=='confirmado'&&{disabled:true}} onClick={()=>{putNotification(current._id,"confirmado");setState("confirmado")}}>
                            <img src='/svg/simple_check.svg'/>
                        </button>
                    </div>
                }
            </div>
            </>
            }
        </div>
    </>
}