'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'
import Link from 'next/link'
import getEnterprises from '@/app/api/enterprises/get_enterprises'
import getElaUsers from '@/app/api/users/get_elaUsers'
import useManager from '@/app/components/table/useManager'

export default function UserManager(){

    const enterpriseManager = useManager<Enterprise>('enterprises')

    const date = new Date('2024-05-23T15:4')

    console.log(date.toString())

    const setExtraActions = ()=>{
        return <>
            {enterpriseManager.current &&
                <Link
                    href={'/empresas/informes/agua/'+enterpriseManager.current._id}
                >
                    Ver informes
                </Link>
            }
        </>
    }

    return <>
        <h1 className={styler.pageTitle_h}>Gestión de empresas<hr/></h1>
        <div className={styler.content_div}>
            <Table
                className={styler.clients_table}
                manager={enterpriseManager}
                createForm={'/empresas/nuevo'}
                editForm={'/empresas/editar'}
                canDelete
                extraActions = {setExtraActions()}
            >
                <Column field="nNit">NIT</Column>
                <Column field="razonSocial">Razón Social</Column>
                <Column field="direccion">Dirección</Column>
                <Column field="celular">Celular</Column>
                <Column field="tipo">Tipo</Column>
                <Column field="sede">Sede</Column>
            </Table>
        </div>
    </>
}