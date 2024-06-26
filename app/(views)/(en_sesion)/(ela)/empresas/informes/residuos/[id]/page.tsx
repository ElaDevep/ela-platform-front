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
                    <Column field="mes">Mes</Column>
                    <Column field='variacionDesperdicios' unit='Unidad Materia/ Unidad de Producción'>Reducción de desperdicios</Column>
                    <Column field='variacionGeneracionResiduos' unit='Kgs/Unidad de producción'>Generación de residuos</Column>
                    <Column field='variacionPersonal' >Personal capacitado</Column>
                    {/* <Column field='reduccionPGIRS'>Variación de residuos peligrosos</Column> */}
                    <Column field='variacionRAEESI' unit='Kgs/Unidad de producción'>Generación de Residuos de Aparatos Eléctricos</Column>
                    <Column field='reduccionRespel' unit='Kgs/Unidad de producción'>Generación de residuos peligroso</Column>
                    <Column field='variacionReciclaje'>Reciclaje</Column>
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