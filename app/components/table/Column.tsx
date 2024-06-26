'use client'

import styler from './Table.module.sass'

export default function Column({
    field,
    children,
    unit
}:Readonly<{
    field:string
    children?:string|React.ReactNode
    unit?:string
}>){
    return <>
        {children}
    </>
}