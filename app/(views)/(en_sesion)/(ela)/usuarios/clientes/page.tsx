'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'
import UserCard from '../UserCard'
import axios from 'axios'
import useManager from '@/app/components/table/useManager'

export default function UserManager(){
    
    const clientManager = useManager<User>('users/clients')

    return <>
        <h1 className={styler.pageTitle_h}>Gestión de clientes<hr/></h1>
        <div className={styler.content_div}>
            <Table
                className={styler.clients_table}
                manager={clientManager}
                createForm={'/usuarios/clientes/nuevo'}
            >
                <Column field="id">Id</Column>
                <Column field="name">Nombre</Column>
                <Column field="lastname">Apellidos</Column>
                <Column field="email">Correo electrónico</Column>
                <Column field="mobile">Celular</Column>
                <Column field="businessName">Empresa</Column>
            </Table>
            <UserCard manager={clientManager}/>
        </div>
    </>
}