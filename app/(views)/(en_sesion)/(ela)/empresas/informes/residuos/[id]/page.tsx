'use client'

import { useEffect, useState } from 'react'
import ReportReader from '../../ReportReader'
import styler from './page.module.sass'
import getEnterprise from '@/app/api/enterprises/get_enterprise'
import EnterpriseCard from '../../EnterpriseCard'
import useManager from '@/app/components/table/useManager'
import postWaterReport from '@/app/api/reports/agua/post_waterReport'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import postWasteReport from '@/app/api/reports/agua/post_wasteReport'

export default function WasteReport({params}:{params:{id:string}}){
    const [enterprise,setEnterprise] = useState<Enterprise>() 
    const historicWasteManager = useManager<Report>('reports/residuos/'+params.id)

    const gettingEnterprise = async() =>{
        const response = await getEnterprise(params.id)
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
                <Table
                    manager={historicWasteManager}
                    className={styler.reports_table}
                >
                <Column field='mes' >Variacion</Column>
                
                <Column field='variacionDesperdicios' >Variación de desperdicios</Column>
                <Column field='variacionGeneracionResiduos'> Variación de generación de desperdicios</Column>
                <Column field='variacionPersonal' >Variación de personal capacitado</Column>
                <Column field='variacionRAEESI' >Variación de RAEESI</Column>
                <Column field='variacionReciclaje'>Variación de reciclaje</Column>
                <Column field='variacionResiduosPeligrosos'>Variación de residuos peligrosos</Column>
                </Table>
                <div className={styler.info_div}>
                    <EnterpriseCard enterprise={enterprise}/>
                    <ReportReader 
                        id={params.id} 
                        manager={historicWasteManager}
                        action={postWasteReport}
                    />
                </div>
            </>
        }
    </>
}