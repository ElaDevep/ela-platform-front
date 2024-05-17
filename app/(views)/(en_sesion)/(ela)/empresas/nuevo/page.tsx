'use client'
import EnterpriseForm from '../EnterpriseForm'
import ElaForm from '../EnterpriseForm'
import styler from './page.module.sass'
import Link from 'next/link'

export default function NewEnterprise(){

    return <>
        <Link
            className={styler.cancelForm_link}
            href={'/empresas'}
        >
            <img src='/svg/cancel_form.svg'/>
        </Link>
        <h1 className={styler.pageTitle_h}>Creación de empresa<hr/></h1>
        <EnterpriseForm/>
    </>
}