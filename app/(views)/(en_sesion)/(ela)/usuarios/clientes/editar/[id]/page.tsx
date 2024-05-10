'use client'
import ClientForm from '../../ClientForm'
import styler from './page.module.sass'
import Link from 'next/link'

export default function NewClient({param}:{param:{id:string}}){

    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/usuarios/clientes'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Editar cliente<hr/></h1>
        <ClientForm/>
    </>
}