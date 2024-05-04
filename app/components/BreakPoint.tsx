'use client'

import {useDevice,useProps} from "@/ela-hooks"
import { DetailedHTMLProps, DetailedReactHTMLElement, HTMLAttributes, cloneElement, useEffect, useState } from "react"

export default function BreakPoint({
    children,
    element,
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
    element:{type: any} & {[key:string]:any}
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
    const responsiver = useProps([
        {
            props:{...element.props}
        }
    ])

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
        if(hide) {
            setHidden(breakCheckSetter())
            return
        }
        responsiver.mixClasses([className,element.props.className],{
            someTrue:[breakCheckSetter(),(device.desk && isDesk),(device.mobile && isMobile)],
            exist:[className],
            noExist:[hide]
        })
        responsiver.set({className:element.props.className},{
            allTrue:[!breakCheckSetter(),!(device.desk && isDesk),!(device.mobile && isMobile)]
        })
    },[,device])



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

    //cloneElement(element.type,element.props,children)

    return <>
        <element.type {...responsiver.props}>
            {!hidden &&
            <>
                {children}
            </>
            }
        </element.type>
    </>
}