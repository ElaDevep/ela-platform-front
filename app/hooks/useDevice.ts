'use client'

import { useScreenSize } from "@/ela-hooks"
import { useEffect, useState } from "react"

const useDevice = () =>{
    const {width,height} = useScreenSize()
    const [mobile,setMobile] = useState<boolean>(false)
    const [desk,setDesk] = useState<boolean>(false)
    const [relation,setRelation] = useState<number>(0)
    const [relationChange,setRelationChange] = useState<boolean>(false)
    const [colorScheme,setColorScheme] = useState<'dark'|'light'>()

    useEffect(()=>{
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        //@ts-ignore
            setMobile(true)
        } else {
            //@ts-ignore
            setDesk(true)
        }

        setColorScheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

        
        if(width && height)
            setRelation(width/height)
    },[])

    useEffect(()=>{
        if(width && height)
            setRelation(width/height)
    },[width,])
    
    useEffect(()=>{
        if(width && height)
            setRelation(width/height)
    },[height,])


    const relationMinorThan = (width:number,height:number) =>{
        let relationRef= width/height
        if(relation){
            setRelationChange(relation<=relationRef)
            return (relation<=relationRef)
        }else{
            return false
        }
    }
    

    
    const relationEqualThan = (width:number,height:number) =>{
        let relationRef= width/height
        return (relation==relationRef)
    }

    
    const relationHigherThan = (width:number,height:number) =>{
        let relationRef= width/height
        return (relation>=relationRef)
    }

    return {
        mobile,
        desk,
        relation,
        relationEqualThan,
        relationHigherThan,
        relationMinorThan,
        width,
        height,
        colorScheme,
        relationChange}
}

export default useDevice