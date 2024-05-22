'use client'

import { useEffect, useState } from 'react'
import styler from './Notification.module.sass'
import { usePageContext } from '@/app/context/PageContext'
import useProps from '@/app/hooks/useProps'

export default function Notification({
}:Readonly<{
}>){
    const {setLastAction,lastAction} = usePageContext()
    const [showLastAction,setShowLastAction] = useState<boolean>()
    
    const lastActionProps = useProps([{
        props:{className:styler.lastAction}
    }])
    

    useEffect(()=>{
        if(lastAction){
            switch(lastAction?.type){
                case 'right':
                    lastActionProps.mixClasses(styler.lastRightAction,{
                        allTrue:[lastAction?.type == 'right']
                    },true)
                    break
                    
                case 'error':
                    lastActionProps.mixClasses(styler.lastErrorAction,{
                        allTrue:[lastAction?.type == 'error']
                    },true)
                    break

                case 'info':
                    lastActionProps.mixClasses(styler.lastInfoAction,{
                        allTrue:[lastAction?.type == 'info']
                    },true)
                    break
            }
            setShowLastAction(true)
        }
    },[lastAction])

    useEffect(()=>{
        if(showLastAction){
            setTimeout(()=>{
                setShowLastAction(undefined)
            },6000)
        }
    },[showLastAction])

    return <>
        {showLastAction && lastAction &&
            <>
                <div {...lastActionProps.props}>
                    <span>{lastAction.title}</span>
                    <p>{lastAction.message}</p>
                </div>
            </>
        }
    </>
}