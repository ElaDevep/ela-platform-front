'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'
import Link from 'next/link'
import getEnterprises from '@/app/api/enterprises/get_enterprices'
import getElaUsers from '@/app/api/users/get_elaUsers'
import useManager from '@/app/components/table/useManager'

export default function UserManager(){

    const enterpriseManager = useManager<Enterprise>('enterprises')

    


    return <>
        <h1 className={styler.pageTitle_h}>Gestión de empresas<hr/></h1>
        <div className={styler.content_div}>
            <Table
                className={styler.clients_table}
                manager={enterpriseManager}
                createForm={'/empresas/nuevo'}
            >
                <Column field="nit">NIT</Column>
                <Column field="razonSocial">Razón Social</Column>
                <Column field="direccion">Dirección</Column>
                <Column field="celular">Celular</Column>
                <Column field="tipo">Tipo</Column>
            </Table>
        </div>
    </>
}