'use client'

import Table from '@/app/components/table/Table'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getClients from '@/app/api/users/get_clients'
import Column from '@/app/components/table/Column'
import UserCard from '../UserCard'

export default function UserManager(){
    const [current,setCurrent] = useState<User>({
        approved:false,
        email: "Paulcastill@example.com",
        idEnterprice:"ELa",
        imgProfile:"https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg",
        lastname:"pedrocastill",
        mobile:"1111111111",
        name:"paulitaCastill",
        password:"$2b$10$IuNSw6xGOinrspK3gNF3GeyZXDQtlfMZWSBrnoDfK4QkkQtlZUMnW",
        role:"Cliente",
        _id:"6629d819587ce685911ca51e"
    })

    const getAllUsersTest = async() =>{
        console.log(await getClients())
    }

    // useEffect(()=>{
    //     getAllUsersTest()
    // })


    return <>
        <main className={styler.main}>
            <h1 className={styler.pageTitle_h}>Gestión de clientes<hr/></h1>
            <div className={styler.content_div}>
                <Table
                    className={styler.clients_table}
                    dataSetter={getClients}
                    getCurrent={setCurrent}
                >
                    <Column field="_id">Id</Column>
                    <Column field="name">Nombre</Column>
                    <Column field="lastname">Apellidos</Column>
                    <Column field="email">Correo electrónico</Column>
                    <Column field="mobile">Celular</Column>
                    <Column field="idEnterprice">Empresa</Column>
                </Table>
                <UserCard user={current}/>

            </div>
        </main>
    </>
}