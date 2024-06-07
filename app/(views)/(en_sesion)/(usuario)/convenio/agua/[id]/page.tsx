'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'

export default function WaterResults({params}:{params:{id:string}}){
    
    const historicWaterManager = useManager<Report>('reports/agua/'+params.id)
    const [lastReport,setLastReport] = useState<Report>()

    useEffect(()=>{
        if(historicWaterManager.data){
            setLastReport(historicWaterManager.data.reverse()[0])
        }
    },[historicWaterManager.data])

    useEffect(()=>{
        console.log(lastReport)
    },[lastReport])

    return <>

        {lastReport &&
            <>
                <h2>Ultimo reporte</h2>
                <div className={styler.lastInfo_div}>
                    <LastInfoCard 
                    title='Reducción de consumo hídrico' 
                    unit='%' 
                    data={lastReport.reduccionAhorroHidrico}
                    />
                    <LastInfoCard 
                    title='Variacion de consumo de recursos' 
                    unit='m3/Unidad Producida' 
                    data={lastReport.variacionConsumoRecursos
                    }
                    />
                    <LastInfoCard 
                    title='Variacion de personal capacitado' 
                    unit='%' 
                    data={lastReport.variacion}
                    />
                </div>
            </>
        }
        
        <h2>Historial</h2>
        <Table
            manager={historicWaterManager}
            className={styler.reports_table}
        >
            <Column field='mes'>Mes</Column>
            <Column field='reduccionAhorroHidrico'>Reducción ahorro hídrico(%)</Column>
            <Column field='variacion'>Variación de personal(%)</Column>
            <Column field='variacionConsumoRecursos'>Variación de consumo de recursos(m3/u)</Column>
        </Table>
    </>
}