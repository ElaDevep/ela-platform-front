'use client'

import useProps from '@/app/hooks/useProps'
import styler from './Table.module.sass'
import { Children, useEffect } from 'react'
import { exit } from 'process'

export default function Row({
    header,
    children,
    onSelect,
    selected,
    id,
}:Readonly<{
    header?:boolean
    children:React.ReactNode
    id?:string
    selected?:boolean
    onSelect?:()=>void
}>){
    const row = useProps([{
            props:{onClick:onSelect}
        },
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
        row.mixClasses(styler.selected_row,{
            exist:[selected]
        },true)
        
    },[selected])



    return <>
        <div {...row.props} key={id}>
            {
                Children.toArray(children).map((child,index)=>{
                    return <span key={index} onClick={()=>{}}>{child}</span>
                })
            }
        </div>
    </>
}