'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styler from './useTable.module.sass'
import axios from 'axios'
import { usePageContext } from '@/app/context/PageContext'
import { title } from 'process'


export interface useManager<ItemType>{
    data:[ItemType]|undefined,
    error:boolean
    current:ItemType|undefined,
    setCurrent:Dispatch<SetStateAction<ItemType | undefined>>
    deleteCurrent:() => Promise<void>
    getAllData:()=>Promise<void>
}

type ItemTypeV<T> = T extends {_id:string} ? T : undefined

export default function useManager<ItemType>(endpoint:string){
    const [current,setCurrent] = useState<ItemTypeV<ItemType>>()
    const [data,setData] = useState<[ItemTypeV<ItemType>]>()
    const [error,setError] = useState<boolean>(false)
    const {setLastAction} = usePageContext()

    const manageAxios = axios.create({
        baseURL:'/api/'
    })

    const getAllData = async()=>{
        await manageAxios.get(endpoint)
        .then((res)=>{
           //console.log(res.data)
            if(res.data.status == 'error'){
                throw 'error'
            }
            setData(res.data.data)
            setError(false)
        })
        .catch((error)=>{
            //console.log(error)
            if(!data){
                setError(true)
            }
        })
    }

    const deleteCurrent = async()=>{
        if(current){
            //console.log(endpoint+'/'+current._id)
            await manageAxios.delete(endpoint+'/'+current._id)
            .then((res)=>{
                //console.log(res)
                setCurrent(undefined)
                getAllData()
                setLastAction({
                    type:'info',
                    title:'Eliminación exitosa',
                    message: current._id + ' ha sido eliminado'
                })
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }

    useEffect(()=>{
        getAllData()
    },[])

    
    return {
        data,
        error,
        current,
        setCurrent,
        deleteCurrent,
        getAllData
    }
}