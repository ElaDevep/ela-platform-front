'use client'

import Animator from '@/app/components/Animator'
import styler from './page.module.sass'
import { useContext, useEffect } from 'react'
import { usePageContext } from '@/app/context/PageContext'

export default function Home(){

    return <>
        <main className={styler.main}>
            <Animator 
                className={styler.charging_animation}
                baseRoute="/animations/charging/"
                framing={3}
                start={0}
                end={2}
                infinite
                auto
            />
        </main>
    </>
}