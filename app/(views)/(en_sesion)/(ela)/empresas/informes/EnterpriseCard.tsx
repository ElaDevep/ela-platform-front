'use client'

import styler from './EnterpriseCard.module.sass'

export default function EnterpriseCard({enterprise}:Readonly<{enterprise:Enterprise}>){
    return <>
        <div className={styler.enterpriseCard_div}>
            <h1>{enterprise.razonSocial }</h1>
            <p>NIT: {enterprise.nNit}</p>
            <h3>Sede</h3>
            <p>{enterprise.sede}</p>
            <h3>Tipo</h3>
            <p>{enterprise.tipo}</p>
            <h3>Dirección</h3>
            <p>{enterprise.direccion}</p>
            <h3>Celular</h3>
            <p>{enterprise.celular}</p>
        </div>
    </>
}