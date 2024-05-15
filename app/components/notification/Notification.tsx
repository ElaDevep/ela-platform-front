'use client'

import { useEffect, useState } from 'react'
import styler from './Notification.module.sass'
import { usePageContext } from '@/app/context/PageContext'
import useProps from '@/app/hooks/useProps'

export default function Notification({
    lastAction
}:Readonly<{
    lastAction:LastAction|undefined
}>){
    const {setLastAction} = usePageContext()
    const [reRender,makeReRender] = useState({})
    
    const lastActionProps = useProps([{
        props:{className:styler.lastAction}
    }])
    

    useEffect(()=>{
        console.log('🗿')
        console.log(lastAction)
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
    })

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