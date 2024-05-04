'use client'

import styler from "./Frame.module.sass"
import Image from "next/image";
import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";
import { useDevice, useProps } from "@/ela-hooks";
import { useEffect, useState } from "react";

export default function Frame({
    src,
    darkSrc,
    alt,
    className,
    contain,
    fill,
    cover,
    onClick,
    onDrag,
    onMouseDown,
    onMouseUp,
}: Readonly<{
    src:StaticImageData|string
    darkSrc?:StaticImport|string
    alt:string
    className?:string
    contain?:boolean
    fill?:boolean
    cover?:boolean
    onClick?:()=>any
    onDrag?:()=>any
    onMouseDown?:()=>any
    onMouseUp?:()=>any
}>){
    const device = useDevice()

    const container = useProps([
        {
            props:{
                className:styler.container
            }
        },
        {
            mixClass:className,
            conditions:{
                exist:className
            }
        }
    ])


    const image = useProps([
        {
            props:{
                style:{
                    width:'100%',
                    height:'100%'
                }
            }
        },{
            mix:{
                style:{
                    objectFit:'contain'
                }
            },
            conditions:{
                exist:contain,
                noExist:[fill,cover]
            }
        },{
            mix:{
                style:{
                    objectFit:'cover'
                }
            },
            conditions:{
                exist:cover,
                noExist:[fill,contain]
            }
        },{
            mix:{
                style:{
                    objectFit:'fill'
                }
            },
            conditions:{
                exist:fill,
                noExist:[contain,cover]
            }
        }
    ])
    
    return <>
        <div 
            {...container.props}
            {...onClick && {onClick:onClick}}    
            {...onDrag && {onDrag:onDrag}}    
            {...onMouseDown && {onMouseDown:onMouseDown}}    
            {...onMouseUp && {onMouseUp:onMouseUp}}    
        >
            <div className={styler.filter}></div>
                <Image
                src={(device.colorScheme == 'dark' && darkSrc!=undefined)?darkSrc:src}
                alt = {alt}
                sizes={"1000px"}
                fill
                {...image.props}
                />
        </div>
    
    </>
}