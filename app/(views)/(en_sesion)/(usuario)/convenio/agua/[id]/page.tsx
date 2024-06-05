import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'

export default function WaterResults(params:{id:string}){
    
    const historicWaterManager = useManager<Report>('reports/agua/'+params.id)



    return <>

    </>
}