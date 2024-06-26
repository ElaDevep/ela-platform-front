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
import postEducationReport from '@/app/api/reports/agua/post_educationReport'

export default function EducationReport({params}:{params:{id:string}}){
    const [enterprise,setEnterprise] = useState<Enterprise>() 
    const historicEducationManager = useManager<Report>('reports/educacion/'+params.id)

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
                    manager={historicEducationManager}
                    className={styler.reports_table}
                >
                    <Column field='mes'>Mes</Column>
                    <Column field='variacionPersonal' unit='%'>Personal capacitado</Column>
                </Table>
                <div className={styler.info_div}>
                    <EnterpriseCard enterprise={enterprise}/>
                    <ReportReader 
                        id={params.id} 
                        manager={historicEducationManager}
                        action={postEducationReport}
                    />
                </div>
            </>
        }
    </>
}