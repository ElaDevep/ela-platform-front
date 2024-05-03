'use client'

import {useDevice,useProps} from "@/ela-hooks"
import { useEffect, useState } from "react"

export default function BreakPoint({
    children,
    className,
    hide,
    isMobile,
    isDesk,
    relation,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight
}:Readonly<{
    children:React.ReactNode
    className?:string
    hide?:string
    isMobile?:boolean
    isDesk?:boolean
    relation?:FixArray<number,2>
    minWidth?:number
    maxWidth?:number
    minHeight?:number
    maxHeight?:number
}>){
    const device = useDevice()
    const [hidden,setHidden] = useState<boolean>()
    const responsiver = useProps([{
        props:{
            className:className
        },
        conditions:{
            exist:[isMobile],
            noExist:[isDesk],
            allTrue:[device.mobile]
        }
    },{
        props:{
            className:className
        },
        conditions:{
            exist:[isDesk],
            noExist:[isMobile],
            allTrue:[device.desk]
        }
    }])

    const breakCheckSetter = ()=> {
        if(device.width){
            if(minWidth){
                if(device.width > minWidth) return true
            }
            if(maxWidth){
                if(device.width < maxWidth) return true
            }
        }

        if(relation){
            if(device.relationMinorThan(relation[0],relation[1])) return true
        }

        if(device.height){
            if(minHeight){
                if(device.height > minHeight) return true
            }
            if(maxHeight){
                if(device.height < maxHeight) return true
            }
        }

        return false
    }

    useEffect(()=>{
        if(hide) setHidden(breakCheckSetter())
        responsiver.set({className:className},{
            allTrue:[breakCheckSetter()],
            exist:[className],
            noExist:[hide]
        },true)
    },[,device.relation])



    useEffect(()=>{
        if(hide){
            if(isMobile && device.mobile){
                setHidden(true)
            }
            if(isDesk && device.desk){
                setHidden(true)
            }
        }
    },[])

    return <>
        <div {...responsiver.props}>
            {!hidden &&
            <>
                {children}
            </>
            }
        </div>
    </>
}