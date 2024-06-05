'use client'

import Animator from '@/app/components/Animator'
import styler from './page.module.sass'
import { useContext, useEffect } from 'react'
import { usePageContext } from '@/app/context/PageContext'
import setCurrentUser from '@/app/api/auth/set_current_user'

export default function Home(){
    const setCurrent= async()=>{
        const response = await setCurrentUser()
        console.log(response)
        if(response.status=='ok' && window){
            window.location.reload()
        }
    }

    useEffect(()=>{
        setCurrent()
    },[])

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