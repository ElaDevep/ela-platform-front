'use client'

import { Children, Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react'
import styler from './Table.module.sass'
import useProps from '@/app/hooks/useProps'
import Row from './Row'
import Animator from '../Animator'
import { Frame } from '../ela-components'
import server_error_d from '@/public/svg/server_error_d.svg'
import server_error_w from '@/public/svg/server_error_w.svg'
import Link from 'next/link'
import { useManager } from './useManager'

export default function Table({
    children,
    className,
    manager,
    createForm
}:Readonly<{
    children:React.ReactNode
    className:string
    manager:useManager<any>
    createForm?:string
}>){
    const [reRender,makeReRender] = useState({})

    const table = useProps([
        {
            props:{className:styler.table_div}
        },{
            mixClass:className
        }
    ])

    const message = useProps([
        {
            props:{className:styler.tableMessage_div}
        },{
            mixClass:className
        }
    ])

    const setTable = () =>{
        const fields =Children.toArray(children).map((child,key)=>{
            try{
                //@ts-ignore
                return child.props.field
            }
            catch(e){
                throw new Error('Table component can only have Column components as children')
            }
        })

        const headers = Children.toArray(children).map((child)=>{
            try{
                
                //@ts-ignore
                return child.props.children
            }
            catch(e){
                throw new Error('Table component can only have Column components as children')
            }
        })
        
        console.log(manager.data)
        //@ts-ignore
        const records = manager.data.map((record,index)=>{
            console.log('🪦')
            return <Row
                key={index}
                record={record}
                id={record._id}
                selected={(manager.current && manager.current._id == record._id)?true:false}
                manager={manager}
            >
                {
                    fields.map((field)=>{
                        if(field=='id'){
                            return index
                        }
                        else 
                        if(typeof record[field]=='boolean'){
                            return (record[field]?'v':'x')
                        }
                        else if(!record[field]){
                            return ''
                        }
                        else{
                            //@ts-ignore
                            return record[field]
                        }
                    })
                }
            </Row>
        })


        // //@ts-ignore
        return <>
            <Row 
                header
                manager={manager}
            >
                {headers}
            </Row>
            <div className={styler.records_div}>
                {records}
            </div>
        </>
    }

    useEffect(()=>{
        makeReRender({})
    },[manager.current,manager.data])

    return <>
        {manager.data && <>
            <div {...table.props}>
                <div className={styler.scrollTable_div}>
                {setTable()}
                </div>
                
                {createForm && 
                    <Link 
                        className={styler.newItem_link}
                        href={createForm}
                    >
                        Crear
                    </Link>
                }
                
            </div>
        </>
        }
        {manager.error &&
            <>
                <div {...message.props}>
                    <Frame
                        src={server_error_w}
                        darkSrc={server_error_d}
                        alt={'server_error'}
                        className={styler.serverError_img}
                        contain
                    />
                    <span>Lo sentimos, tenemos algunos problemas.<br/>Por favor intenta mas tarde</span>
                </div>
            </>
        }
        {!manager.data && !manager.error && 
            <>
                <div {...message.props}>
                    <Animator
                        className={styler.charging_animation}
                        baseRoute="/animations/charging/"
                        framing={3}
                        start={0}
                        end={2}
                        infinite
                        auto
                    />
                </div>
            </>
        }
    </>
}