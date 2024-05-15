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

export default function Table({
    children,
    className,
    dataSetter,
    getCurrent,
    createForm
}:Readonly<{
    children:React.ReactNode
    className:string
    dataSetter:any
    createForm?:string
    getCurrent?:Dispatch<SetStateAction<any>>
}>){
    const [data,setData] = useState<{[key:string]:any}[]>()
    const [error,setError] = useState<boolean>(false)
    const [current,setCurrent] =useState<{[key:string]:any}>()
    const [reRender,makeReRender] = useState<{}>()
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

    const gettingData = async()=>{
        const response = await dataSetter()
        if(response){
            if(response.status=='ok'){
                setData(response.data)
            }
            else{
                //console.log(response)
                setError(true)
            }
        }
    }

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
        
        //@ts-ignore
        const records = data.map((record,index)=>{
            return <Row
                key={index}
                id={record._id}
                selected={(current && current._id == record._id)?true:false}
                onSelect={()=>setCurrent(record)}
            >
                {
                    fields.map((field)=>{
                        if(field=='_id'){
                            return index
                        }
                        else if(typeof record[field]=='boolean'){
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
            >
                {headers}
            </Row>
            <div className={styler.records_div}>
                {records}
            </div>
        </>
    }

    
    useEffect(()=>{
        if(current && getCurrent){
            getCurrent(current)
        }
        makeReRender({})
    },[current])

    useEffect(()=>{
        gettingData()
    },[])

    return <>
        {data && <>
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
        {error &&
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
        {!data && !error && 
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