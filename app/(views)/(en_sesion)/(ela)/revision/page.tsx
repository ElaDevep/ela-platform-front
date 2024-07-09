'use client'

import { useEffect } from 'react'
import styler from './page.module.sass'
import useManager from '@/app/components/table/useManager'
import Table from '@/app/components/table/Table'
import Link from 'next/link'
import Column from '@/app/components/table/Column'

export default function PostReviewTable(){
    const postManager = useManager<{[key:string]:any}>('post')
    
    const setExtraActions = ()=>{
        return <>
            {postManager.current &&
                <Link
                    href={
                        //@ts-ignore
                        '/revision/'+postManager.current._id
                    }
                >
                    Revisar
                </Link>
            }
        </>
    }

    useEffect(()=>{
       //console.log(postManager.data)
    })

    return <>
        <h2 className={styler.pageTitle_h}>Revision de blogs <hr/></h2>
        
        <Table
                className={styler.clients_table}
                manager={postManager}
                canDelete
                extraActions = {setExtraActions()}

            >
                <Column field="author">Autor</Column>
                <Column field="razonSocial">Empresa</Column>
                <Column field="title">Titulo</Column>
                <Column field="fechaCreacion">Fecha de creación</Column>
            </Table>
    </>
}