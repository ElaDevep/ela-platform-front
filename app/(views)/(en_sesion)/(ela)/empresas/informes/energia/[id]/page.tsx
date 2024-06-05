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
                    <Column field='variacionConsumoEnergia'>Variación de consumo</Column>
                    <Column field='variacionConsumoNoAsociado'>Variación consumo no asociado</Column>
                    <Column field='variacionCostosEnergia'>Variación de costos</Column>
                    <Column field='variacionDiagnosticoEnergetico'>Variación Diagnostico</Column>
                    <Column field='variacionGasesInvernadero'>Variación de GEI</Column>
                    <Column field='variacionPersonalCapacitado'>Variación personal capacitado</Column>
                    <Column field='variacionProduccionEnergetica'>Variación producción energética</Column>
                    <Column field='variacionProporcionEnergia'>Variación producción energía</Column>
                    <Column field='variacionPuntoMedicion'>Variación punto medición</Column>
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