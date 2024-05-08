'use client'

import Animator from '@/app/components/Animator'
import styler from './page.module.sass'

export default function Home(){
    return <>
        <Animator 
            className={styler.home_div}
            baseRoute="/animations/charging/"
            framing={3}
            start={0}
            end={2}
            infinite
            auto
        />
    </>
}