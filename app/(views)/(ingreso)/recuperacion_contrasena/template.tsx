import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Recuperación de contraseña',
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