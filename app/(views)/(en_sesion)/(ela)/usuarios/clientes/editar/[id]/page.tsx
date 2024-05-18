'use client'
import { useEffect, useState } from 'react'
import ClientForm from '../../ClientForm'
import styler from './page.module.sass'
import Link from 'next/link'
import getUser from '@/app/api/users/get_user'
import { usePageContext } from '@/app/context/PageContext'
import { title } from 'process'


export default function NewClient({params}:{params:{id:string}}){
    const [user,setUser] = useState<User>()
    const {setLastAction} = usePageContext()

    const gettingUser = async() =>{
        const response = await getUser(params.id)
        if(response.status == 'ok'){
            setUser(response.data)
        }
        else{
            setLastAction({
                title:'Error de consulta',
                message:response.data
            })
        }
    }

    useEffect(()=>{
        gettingUser()
    },[])
    
    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/usuarios/clientes'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Editar cliente<hr/></h1>
        {user &&
            <ClientForm user={user}/>
        }
        
    </>
}