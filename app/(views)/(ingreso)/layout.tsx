'use client'

import enter_background from '@/public/jpg/enter_background.jpg'

import { BreakPoint, Frame } from '@/ela-components'

import styler from './layout.module.sass'
import { useEffect } from 'react'

export default function Layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>
        <BreakPoint
            className={styler.vertical_relation}
            relation={[4,5]}
            element={<main className={styler.main}/>}
        >
            <Frame
                src={enter_background}
                alt={'fondo'}
                className={styler.background_img}
                cover
            />
            <div className={styler.upLayer_div}/>
            {children}
        </BreakPoint>
    </>
}
