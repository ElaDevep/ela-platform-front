'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import getEnterprise from '@/app/api/enterprises/get_enterprise'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import EnterpriseCard from '../../EnterpriseCard'
import NotificationCard from '../../../../../NotificationCard'

export default function Notifications({params}:{params:{id:string}}){
    const [enterprise,setEnterprise] = useState<Enterprise>() 
    const notificationManager = useManager<Notification>('notifications/'+params.id)

    const gettingEnterprise = async() =>{
        const response = await getEnterprise(params.id)
       //console.log(response.data)

        if(response.status=='ok'){
           //console.log(response.data)
            setEnterprise(response.data)
        }
    }

    useEffect(()=>{
        gettingEnterprise()
    },[])

    return <>
    
        {enterprise && 
            <>
                <div className={styler.info_div}>
                    <Table
                        manager={notificationManager}
                        className={styler.reports_table}
                        canDelete
                        createForm={'/empresas/informes/notificaciones/nueva/'+params.id}
                    >
                        <Column field='fecha'>Fecha</Column>
                        <Column field='titulo'>Titulo</Column>
                        <Column field='estado'>Estado</Column>
                    </Table>
                    <NotificationCard current={notificationManager.current} onlyView/>
                </div>
                <EnterpriseCard enterprise={enterprise} className={styler.enterpriseCard}/>
                
            </>
        }
    </>
}