'use client'

import { Children, ReactElement, useEffect, useState } from 'react'
import styler from './Table.module.sass'
import useProps from '@/app/hooks/useProps'
import Row from './Row'

export default function Table({
    children,
    className,
    dataSetter
}:Readonly<{
    children:React.ReactNode
    className:string
    dataSetter:any
}>){
    const [data,setData] = useState<{[key:string]:any}[]>()
    const [error,setError] = useState<boolean>(false)
    const [current,setCurrent] =useState<string>()
    const [reRender,makeReRender] = useState<{}>()
    const table = useProps([
        {
            props:{className:styler.table_div}
        },{
            mixClass:className
        }
    ])


    const gettingData = async()=>{
        const response = await dataSetter()
        if(response.status=='ok'){
            setData(response.data)
        }
        else{
            setError(true)
        }
    }

    const setTable = () =>{
        const fields =Children.toArray(children).map((child)=>{
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
                
                return <>
                    {/*@ts-ignore*/}
                    {child.props.children}
                </>
            }
            catch(e){
                throw new Error('Table component can only have Column components as children')
            }
        })
        
        //@ts-ignore
        const records = data.map((record,index)=>{
            return <Row
                id={record._id}
                selected={(current == record._id)?true:false}
                onSelect={()=>setCurrent(record._id)}
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


        //@ts-ignore
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
        gettingData()
    },[])

    useEffect(()=>{
        makeReRender({})
    },[current])

    return <>
        {data && <>
            <div {...table.props}>
                {setTable()}
            </div>
        </>
        }
        {error &&
            <h1>Error</h1>
        }
    </>
}