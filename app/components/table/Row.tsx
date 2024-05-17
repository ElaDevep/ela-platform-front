'use client'

import useProps from '@/app/hooks/useProps'
import styler from './Table.module.sass'
import { Children, useEffect } from 'react'
import { exit } from 'process'
import { useManager } from './useManager'

export default function Row({
    header,
    children,
    selected,
    manager,
    record,
    id,
}:Readonly<{
    header?:boolean
    children:React.ReactNode
    id?:string
    selected?:boolean
    manager:useManager<any>
    record?:{[key:string]:any}
}>){
    const row = useProps([
        {
            props:{className:styler.header_row},
            conditions:{
                exist:[header]
            }
        },{
            props:{className:styler.general_row},
            conditions:{
                noExist:[header]
            }
        }
    ])

    useEffect(()=>{
        if(!header){
            row.mixClasses(styler.selected_row,{
                exist:[selected]
            },true)
        }
    },[selected])



    return <>
        <div {...row.props} key={id} onClick={()=>manager.setCurrent(record)}>
            {
                Children.toArray(children).map((child,index)=>{
                    console.log(child)
                    return <span key={index} onClick={()=>{}}>{child}</span>
                })
            }
        </div>
    </>
}