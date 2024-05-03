'use client'

import { useEffect, useState } from "react"
import styler from '../Form.module.sass'
import useProps from "@/app/hooks/useProps"

export default function Submit({
    children,
    className,
    action
}:{
    children:React.ReactNode
    className?:string
    action:(payload: FormData) => void
}){
    const submit = useProps([
        {
            props:{
                className:styler.submit,
                formAction:action
            }
        },{
            mixClass:className,
            conditions:{
                exist:[className]
            }
        }
    ])

    return <>
        <button {...submit.props}>
            {children}
        </button>
    </>
}