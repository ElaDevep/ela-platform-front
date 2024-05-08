'use client'

import { Header } from "@/app/components/ela-components";
import Loading from "@/app/loading";
import { Suspense } from "react";

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Header/>
        {children}
    </>
}