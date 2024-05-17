'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'
import UserCard from '../UserCard'
import Link from 'next/link'
import getEnterprises from '@/app/api/enterprises/get_enterprices'
import getElaUsers from '@/app/api/users/get_elaUsers'
import useManager from '@/app/components/table/useManager'

export default function UserManager(){

    const workerManager = useManager<User>('users/ela')


    return <>
        <h1 className={styler.pageTitle_h}>Gestión de colaboradores<hr/></h1>
        <div className={styler.content_div}>
            <Table
                className={styler.clients_table}
                manager={workerManager}
                createForm={'/usuarios/ela/nuevo'}
            >
                <Column field="id">Id</Column>
                <Column field="name">Nombre</Column>
                <Column field="lastname">Apellidos</Column>
                <Column field="email">Correo electrónico</Column>
                <Column field="mobile">Celular</Column>
                <Column field="role">Rol</Column>
            </Table>
            <UserCard manager={workerManager}/>
        </div>
    </>
}