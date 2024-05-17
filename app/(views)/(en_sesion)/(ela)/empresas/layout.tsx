import type { Metadata } from "next";
import styler from './layout.module.sass'

export const metadata: Metadata = {
    title: 'Gestión de empresas'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <main className={styler.main}>
            {children}
        </main>
    </>
}