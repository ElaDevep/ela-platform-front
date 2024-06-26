'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'

export default function WasteResults({params}:{params:{id:string}}){
    
    const historicWasteManager = useManager<Report>('reports/residuos/'+params.id)
    const [lastReport,setLastReport] = useState<Report>()

    useEffect(()=>{
        if(historicWasteManager.data){
            setLastReport(historicWasteManager.data.reverse()[0])
        }
    },[historicWasteManager.data])

    useEffect(()=>{
        //console.log(lastReport)
    },[lastReport])

    return <>

        {lastReport &&
            <>
                <h2>Ultimo reporte</h2>
                <div className={styler.lastInfo_div}>
                    <LastInfoCard 
                    title='Reducción de desperdicios' 
                    unit='Unidad Materia/ Unidad de Producción'
                    data={lastReport.variacionDesperdicios}
                    />
                    <LastInfoCard 
                    title='Generación de residuos' 
                    unit='Kgs/Unidad de producción' 
                    data={lastReport.variacionGeneracionResiduos}
                    />
                    <LastInfoCard 
                    title='Personal capacitado' 
                    data={lastReport.variacionPersonal}
                    />
                    <LastInfoCard 
                    title='Generación de Residuos de Aparatos Eléctricos' 
                    unit='Kgs/Unidad de producción'
                    data={lastReport.variacionRAEESI}
                    />
                    <LastInfoCard 
                    title='Generación de residuos peligroso' 
                    data={lastReport.reduccionRespel}
                    />
                    <LastInfoCard 
                    title='variacionReciclaje' 
                    unit='Kgs/Unidad de producción'
                    data={lastReport.variacionReciclaje}
                    />
                </div>
            </>
        }
        
        <h2>Historial</h2>
        <Table
            manager={historicWasteManager}
            className={styler.reports_table}
        >
            <Column field="mes">Mes</Column>
            <Column field='variacionDesperdicios' unit='Unidad Materia/ Unidad de Producción'>Reducción de desperdicios</Column>
            <Column field='variacionGeneracionResiduos' unit='Kgs/Unidad de producción'>Generación de residuos</Column>
            <Column field='variacionPersonal' >Personal capacitado</Column>
            {/* <Column field='reduccionPGIRS'>Variación de residuos peligrosos</Column> */}
            <Column field='variacionRAEESI' unit='Kgs/Unidad de producción'>Generación de Residuos de Aparatos Eléctricos</Column>
            <Column field='reduccionRespel' unit='Kgs/Unidad de producción'>Generación de residuos peligroso</Column>
            <Column field='variacionReciclaje'>Reciclaje</Column>
        </Table>
    </>
}