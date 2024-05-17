'use client'
import { useEffect, useState } from 'react'
import ClientForm from '../../EnterpriseForm'
import styler from './page.module.sass'
import Link from 'next/link'
import getUser from '@/app/api/users/get_user'
import { usePageContext } from '@/app/context/PageContext'
import { title } from 'process'
import EnterpriseForm from '../../EnterpriseForm'
import axios from 'axios'
import getEnterprise from '@/app/api/enterprises/get_enterprise'


export default function NewClient({params}:{params:{id:string}}){
    const [enterprise,setEnterprise] = useState<Enterprise>()
    const {setLastAction} = usePageContext()

    const gettingEnterprise = async() =>{
        const response = await getEnterprise(params.id)
        if(response.status == 'ok'){
            console.log(response)
            setEnterprise(response.data)
        }
        else{
            setLastAction({
                type:'error',
                title:'Error de consulta',
                message:response.data
            })
        }
    }

    useEffect(()=>{
        gettingEnterprise()
    },[])
    
    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/empresas'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Editar colaborador<hr/></h1>
        {enterprise &&
            <EnterpriseForm enterprise={enterprise}/>
        }
        
    </>
}