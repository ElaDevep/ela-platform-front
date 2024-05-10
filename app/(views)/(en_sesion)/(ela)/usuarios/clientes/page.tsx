'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'

export default function UserManager(){
    const [current,setCurrent] = useState()

    const getAllUsersTest = async() =>{
        console.log(await getClients())
    }

    // useEffect(()=>{
    //     getAllUsersTest()
    // })


    return <>
        <main className={styler.main}>
            <h1 className={styler.pageTitle_h}>Gestión de clientes<hr/></h1>
            <Table
                className={styler.clients_table}
                dataSetter={getClients}
            >
                <Column field="_id">Id</Column>
                <Column field="name">Nombre</Column>
                <Column field="lastname">Apellidos</Column>
                <Column field="email">Correo electrónico</Column>
                <Column field="mobile">Celular</Column>
                <Column field="idEnterprice">Empresa</Column>
            </Table>
        </main>
    </>
}