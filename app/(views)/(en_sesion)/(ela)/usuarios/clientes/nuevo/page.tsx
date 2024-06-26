'use client'
import ClientForm from '../ClientForm'
import styler from './page.module.sass'
import Link from 'next/link'

export default function NewClient(){

    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/usuarios/clientes'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Creación de cliente<hr/></h1>
        <ClientForm/>
    </>
}