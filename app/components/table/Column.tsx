'use client'

import styler from './Table.module.sass'

export default function Column({
    field,
    children
}:Readonly<{
    field:string
    children?:string|React.ReactNode
}>){
    return <>
        {children}
    </>
}