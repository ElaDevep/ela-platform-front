'use client'

import { useEffect, useState } from 'react'
import styler from './Notification.module.sass'
import { usePageContext } from '@/app/context/PageContext'
import useProps from '@/app/hooks/useProps'

export default function Notification({
}:Readonly<{
}>){
    const {setLastAction,lastAction} = usePageContext()
    
    const lastActionProps = useProps([{
        props:{className:styler.lastAction}
    }])
    

    useEffect(()=>{
        console.log('Bv')
        console.log(lastAction)
        if(lastAction){
            lastActionProps.mixClasses(styler.lastRightAction,{
                allTrue:[lastAction?.type == 'right']
            })
            lastActionProps.mixClasses(styler.lastErrorAction,{
                allTrue:[lastAction?.type == 'error']
            })
            lastActionProps.mixClasses(styler.lastInfoAction,{
                allTrue:[lastAction?.type == 'info']
            })
            if(lastAction){
                setTimeout(()=>{
                    setLastAction(undefined)
                },6000)
            }
        }
    },[lastAction])

    return <>
        {lastAction &&
            <>
                <div {...lastActionProps.props}>
                    <span>{lastAction.title}</span>
                    <p>{lastAction.message}</p>
                </div>
            </>
        }
    </>
}