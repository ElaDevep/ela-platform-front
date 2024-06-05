'use client'

import { usePathname } from 'next/navigation';
import styler from './layout.module.sass'
import Link from 'next/link';
import { usePageContext } from '@/app/context/PageContext';
import { useEffect } from 'react';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const {currentUser} = usePageContext()
    const currentModule= (pathname.split('/')).reverse()[1]

    return <>
        <main className={styler.main}>
            <h1 className={styler.pageTitle_h}>Convenio<hr/></h1>
            {currentUser &&
                <nav className={styler.resultsModules_nav+' '+styler[currentModule+'Selected_nav']}>
                    <Link className={styler.waterModule_link} href={'/resultados/agua/'+currentUser.idEnterprise}>Agua</Link>
                    <Link className={styler.energyModule_link} href={'/resultados/energia/'+currentUser.idEnterprise}>Energía</Link>
                    <Link className={styler.wasteModule_link} href={'/resultados/residuos/'+currentUser.idEnterprise}>Residuos</Link>
                    <Link className={styler.educationModule_link} href={'/resultados/educacion/'+currentUser.idEnterprise}>Educación</Link>
                </nav>
            }
            <div className={styler.resultsManager_div}>
                {children}
            </div>
            <h2>Notificaciones</h2>
        </main>
    </>
}