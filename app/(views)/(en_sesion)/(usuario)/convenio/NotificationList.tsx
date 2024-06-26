'use client'

import NotificationCard from '../../NotificationCard'
import styler from './NotificationList.module.sass'
import useManager from '@/app/components/table/useManager'

export default function NotificationList({idEnterprise}:Readonly<{idEnterprise:string}>){
    const notificationManager = useManager<Notification>('notifications/client/'+idEnterprise)
    
    return <>
        {
            notificationManager.data && <div className={styler.notificationList_div}>
                {
                    notificationManager.data.map((notification,index)=>{
                        return <NotificationCard current={notification} key={index.toString()}/>
                    })
                }
            
            </div>
        }
    </>
}