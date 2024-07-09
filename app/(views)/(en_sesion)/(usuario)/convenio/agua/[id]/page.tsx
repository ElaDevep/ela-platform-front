'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'
import ReportGraphic from '@/app/components/reportGraphic/ReportGraphic'

export default function WaterResults({params}:{params:{id:string}}){
    
    const historicWaterManager = useManager<Report>('reports/agua/'+params.id)
    const [lastReport,setLastReport] = useState<Report>()

    useEffect(()=>{
        if(historicWaterManager.data){
            
            setLastReport(historicWaterManager.data.reverse()[0])
        }
    },[historicWaterManager.data])

    useEffect(()=>{
        //console.log(lastReport)
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
                    // />
                    // <LastInfoCard 
                    // title='Consumo de recursos' 
                    // unit='m3/Unidad Producida' 
                    // data={lastReport.variacionConsumoRecursos
                    // }
                    />
                    <LastInfoCard 
                    title='Personal capacitado' 
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
            <Column field='reduccionAhorroHidrico' unit='%'>Reducción ahorro hídrico</Column>
            <Column field='variacion' unit='m3/Unidad Producida' >Variación de personal</Column>
            {/* <Column field='variacionConsumoRecursos' unit='%'>Variación de consumo de recursos</Column> */}
        </Table>

        <h2>Gráfica</h2>
        <ReportGraphic 
        scale={1.1}
        y={120}
        data={historicWaterManager.data} 
        labels={[
            ['reduccionAhorroHidrico','Reducción ahorro hídrico','#0037ce'],
            ['variacion','Variación de personal','#2394d6'],
            // ['variacionConsumoRecursos','Variación de consumo de recursos','#23bbd6'],
        ]}
        template={'https://backend-ela-14.onrender.com/excel/pdf-template/'+params.id}
        ></ReportGraphic>
    </>
}