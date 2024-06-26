'use client'

import { usePathname } from 'next/navigation';
import styler from './layout.module.sass'
import Link from 'next/link';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()
    const currentEnterpriseId = (pathname.split('/')).reverse()[0]
    const currentModule= (pathname.split('/')).reverse()[1]

    return <>
        <h1 className={styler.pageTitle_h}>Gestión de informes<hr/></h1>
        <nav className={styler.reportModules_nav+' '+styler[currentModule+'Selected_nav']}>
            <Link className={styler.waterModule_link} href={'/empresas/informes/agua/'+currentEnterpriseId}>Agua</Link>
            <Link className={styler.energyModule_link} href={'/empresas/informes/energia/'+currentEnterpriseId}>Energía</Link>
            <Link className={styler.wasteModule_link} href={'/empresas/informes/residuos/'+currentEnterpriseId}>Residuos</Link>
            <Link className={styler.educationModule_link} href={'/empresas/informes/educacion/'+currentEnterpriseId}>Educación</Link>
            <Link href={'/empresas/informes/notificaciones/'+currentEnterpriseId}>Notificaciones</Link>
        </nav>
        <div className={styler.reportManager_div}>
            {children}
        </div>
    </>
}