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
import postEnergyReport from '@/app/api/reports/agua/post_energyReport'

export default function EnergyReport({params}:{params:{id:string}}){
    const [enterprise,setEnterprise] = useState<Enterprise>() 
    const historicEnergyManager = useManager<Report>('reports/energia/'+params.id)

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
                <div className={styler.info_div}>
                    <EnterpriseCard enterprise={enterprise}/>
                    <ReportReader 
                        id={params.id} 
                        manager={historicEnergyManager}
                        action={postEnergyReport}
                    />
                </div>
            </>
        }
    </>
}