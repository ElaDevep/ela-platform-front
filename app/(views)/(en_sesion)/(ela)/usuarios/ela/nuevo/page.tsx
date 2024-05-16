'use client'
import ElaForm from '../ElaForm'
import ClientForm from '../ElaForm'
import styler from './page.module.sass'
import Link from 'next/link'

export default function NewClient(){

    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/usuarios/ela'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Creación de colaborador<hr/></h1>
        <ElaForm/>
    </>
}