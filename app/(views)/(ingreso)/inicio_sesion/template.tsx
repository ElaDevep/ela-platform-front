import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Inicio de sesión'
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