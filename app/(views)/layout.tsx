'use client'

import { PageProvider } from "../context/PageContext";

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