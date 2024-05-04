'use client'

import { PageProvider } from "../contex/PageContext";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <PageProvider>
            {children}
        </PageProvider>
    </>
}