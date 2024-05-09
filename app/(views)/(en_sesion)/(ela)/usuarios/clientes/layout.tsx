import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Gestión de clientes'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        {children}
    </>
}