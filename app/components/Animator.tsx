'use client'

import { useEffect, useState } from "react";

export default function Animator({
    className,
    baseRoute,
    framing,
    start=0,
    end,
    auto,
    infinite,
    onClick
}:Readonly<{
    className:string
    baseRoute:string
    framing:number
    start:number
    end:number
    auto?:boolean
    infinite?:boolean
    onClick?:boolean

}>){
    const [nFrame,setNFrame] = useState(start)
    const [frame,setFrame] = useState<string>()
    const [play,setPlay] = useState<boolean>(false)

    const changeFrame = () =>{
        if(nFrame < end){
            setNFrame(nFrame+1)
        }
        else{
            setNFrame(start)
            if(!infinite){
                setPlay(false)
            }
        }
    }

    const setFrameRoute = () =>{
        let timeout = 1000/framing
        let zeros = ''
        console.log()
        for(let i=0;i<(4-nFrame.toString().length);i++){
            zeros+='0'
        }
        //console.log(baseRoute+zeros+nFrame+'.png')
        setFrame(baseRoute+zeros+nFrame+'.png')
        if(play) setTimeout(()=>changeFrame(),timeout)
    }

    useEffect(()=>{
        if(auto) setPlay(true)
    },[])

    useEffect(()=>{
        setFrameRoute()
    },[nFrame])
    
    useEffect(()=>{
        if(play)
            changeFrame()
    },[play])

    return <div {...onClick && {onClick:()=>setPlay(!play)}}>
        <img src={frame} className={className}/>
    </div>
}
