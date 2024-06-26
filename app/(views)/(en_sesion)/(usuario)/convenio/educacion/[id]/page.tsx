'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'

export default function WaterResults({params}:{params:{id:string}}){
    
    const historicEducationManager = useManager<Report>('reports/educacion/'+params.id)
    const [lastReport,setLastReport] = useState<Report>()

    useEffect(()=>{
        if(historicEducationManager.data){
            setLastReport(historicEducationManager.data.reverse()[0])
        }
    },[historicEducationManager.data])

    useEffect(()=>{
        //console.log(lastReport)
    },[lastReport])

    return <>

        {lastReport &&
            <>
                <h2>Ultimo reporte</h2>
                <div className={styler.lastInfo_div}>
                    <LastInfoCard 
                    title='Personal capacitado' 
                    unit='%'
                    data={lastReport.variacionPersonal}
                    />
                </div>
            </>
        }
        
        <h2>Historial</h2>
                <Table
                    manager={historicEducationManager}
                    className={styler.reports_table}
                >
                    <Column field='mes'>Mes</Column>
                    <Column field='variacionPersonal' unit='%'>Personal capacitado</Column>
                </Table>
    </>
}