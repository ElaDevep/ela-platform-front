'use client'

import { useEffect, useState } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Column from '@/app/components/table/Column'
import LastInfoCard from '../../LastInfoCard'
import ReportGraphic from '@/app/components/reportGraphic/ReportGraphic'

export default function EnergyResults({params}:{params:{id:string}}){
    
    const historicEnergyManager = useManager<Report>('reports/energia/'+params.id)
    const [lastReport,setLastReport] = useState<Report>()

    useEffect(()=>{
        if(historicEnergyManager.data){
            setLastReport(historicEnergyManager.data.reverse()[0])
        }
    },[historicEnergyManager.data])

    useEffect(()=>{
        //console.log(lastReport)
    },[lastReport])

    return <>

        {lastReport &&
            <>
                <h2>Ultimo reporte</h2>
                <div className={styler.lastInfo_div}>
                    <LastInfoCard 
                    title='Consumo asociado a producción' 
                    unit='kWh/Tonelada producida' 
                    data={lastReport.variacionConsumoEnergia}
                    />
                    <LastInfoCard 
                    title='Consumo no asociado a producción' 
                    unit='kWh/mes' 
                    data={lastReport.variacionConsumoNoAsociado}
                    />
                    <LastInfoCard 
                    title='Costos de energía' 
                    unit='pesos/mes' 
                    data={lastReport.variacionCostosEnergia}
                    />
                    <LastInfoCard 
                    title='Gases de efecto invernadero (GEI)' 
                    unit='Kg CO2/ Unidad producida' 
                    data={lastReport.variacionDiagnosticoEnergetico}
                    />
                    <LastInfoCard 
                    title='Equipos con diagnostico energetico' 
                    data={lastReport.variacionDiagnosticoEnergetico}
                    />
                    <LastInfoCard 
                    title='Personal capacitado' 
                    unit='%' 
                    data={lastReport.variacionPersonalCapacitado}
                    />
                    <LastInfoCard 
                    title='Proporción consumo de energía' 
                    data={lastReport.variacionProporcionEnergia}
                    />
                    <LastInfoCard 
                    title='Puntos de medición en el proceso' 
                    data={lastReport.variacionPuntoMedicion}
                    />
                </div>
            </>
        }
        
        <h2>Historial</h2>
        <Table
            manager={historicEnergyManager}
            className={styler.reports_table}
        >
            <Column field='mes'>Mes</Column>
            <Column field='variacionConsumoEnergia' unit='kWh/Tonelada producida'>Consumo en producción</Column>
            <Column field='variacionConsumoNoAsociado' unit='kWh/mes'>Consumo no asociado a producción</Column>
            <Column field='variacionCostosEnergia' unit='pesos/mes' >Costos</Column>
            <Column field='variacionDiagnosticoEnergetico'>Equipos con diagnostico</Column>
            <Column field='variacionGasesInvernadero' unit='Kg CO2/ Unidad producida' >Emisión de gases de efecto invernadero</Column>
            <Column field='variacionPersonalCapacitado' unit='%'>Personal capacitado</Column>
            <Column field='variacionProduccionEnergetica'>Producción energética</Column>
            <Column field='variacionPuntoMedicion'>Puntos medición</Column>
        </Table>
        
        <h2>Gráfica</h2>
        <ReportGraphic data={historicEnergyManager.data} labels={[
            ['variacionConsumoEnergia','Consumo en producción','#ffe59f'],
            ['variacionConsumoNoAsociado','Consumo no asociado a producción','#caa84a'],
            ['variacionCostosEnergia','Costos','#ffc933'],
            ['variacionDiagnosticoEnergetico','Equipos con diagnostico','#d19a01'],
            ['variacionGasesInvernadero','Emisión de gases de efecto invernadero','#fbff00'],
            ['variacionPersonalCapacitado','Personal capacitado','#c8ca37'],
            ['variacionProduccionEnergetica','Producción energética','#96810e'],
            ['variacionPuntoMedicion','Puntos medición','#dd9f19'],
        ]}></ReportGraphic>
    </>
}