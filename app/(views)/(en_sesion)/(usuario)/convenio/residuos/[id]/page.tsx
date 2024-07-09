'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'
import ReportGraphic from '@/app/components/reportGraphic/ReportGraphic'

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
                    unit='Unidad Materia/ Unidad producida'
                    data={lastReport.variacionDesperdicios}
                    />
                    <LastInfoCard 
                    title='Generación de residuos' 
                    unit='Kg/Unidad producida' 
                    data={lastReport.variacionGeneracionResiduos}
                    />
                    <LastInfoCard 
                    title='Personal capacitado' 
                    data={lastReport.variacionPersonal}
                    />
                    <LastInfoCard 
                    title='Generación de Residuos de Aparatos Eléctricos' 
                    unit='Kg/Unidad producida'
                    data={lastReport.variacionRAEESI}
                    />
                    <LastInfoCard 
                    title='Generación de residuos peligroso' 
                    unit='Kg/Unidad producida'
                    data={lastReport.reduccionRespel}
                    />
                    <LastInfoCard 
                    title='variacionReciclaje' 
                    unit='Kgs/Unidad producida'
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
            <Column field='variacionGeneracionResiduos' unit='Kgs/Unidad producida'>Generación de residuos</Column>
            <Column field='variacionPersonal' >Personal capacitado</Column>
            {/* <Column field='reduccionPGIRS'>Variación de residuos peligrosos</Column> */}
            <Column field='variacionRAEESI' unit='Kgs/Unidad producida'>Generación de Residuos de Aparatos Eléctricos</Column>
            <Column field='reduccionRespel' unit='Kgs/Unidad producida'>Generación de residuos peligroso</Column>
            <Column field='variacionReciclaje' unit='Kgs'>Reciclaje</Column>
        </Table>
        <h2>Gráfica</h2>
        <ReportGraphic
        y={80}
        template={'https://backend-ela-14.onrender.com/excelResiduos/pdf-templateR/'+params.id}
        scale={1}
        data={historicWasteManager.data} 
        labels={[
            ['variacionDesperdicios','Reducción de desperdicios','#D1DF01'],
            ['variacionGeneracionResiduos','Generación de residuos','#6CD000'],
            ['variacionPersonal','Personal capacitado','#01E47E'],
            ['variacionRAEESI','Equipos con diagnostico','#1AF412'],
            ['reduccionRespel','Generación de residuos peligroso','#28AA69'],
            ['variacionReciclaje','Reciclaje','#71E056']
        ]}></ReportGraphic>
    </>
}