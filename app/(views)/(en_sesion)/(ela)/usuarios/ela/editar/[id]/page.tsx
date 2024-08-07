'use client'
import { useEffect, useState } from 'react'
import ClientForm from '../../ElaForm'
import styler from './page.module.sass'
import Link from 'next/link'
import getUser from '@/app/api/users/get_user'
import { usePageContext } from '@/app/context/PageContext'
import { title } from 'process'
import ElaForm from '../../ElaForm'


export default function NewClient({params}:{params:{id:string}}){
    const [user,setUser] = useState<User>()
    const {setLastAction} = usePageContext()

    const gettingUser = async() =>{
        const response = await getUser(params.id)
        if(response.status == 'ok'){
           //console.log(response)
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
            href={'/usuarios/ela'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Editar colaborador<hr/></h1>
        {user &&
            <ElaForm user={user}/>
        }
        
    </>
}