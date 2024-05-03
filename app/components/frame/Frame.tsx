'use client'

import styler from "./Frame.module.sass"
import Image from "next/image";
import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";
import { useDevice, useProps } from "@/ela-hooks";

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
                },
                src:src
            }
        },
        {
            mix:{
                style:{
                    objectFit:'contain'
                }
            },
            conditions:{
                exist:contain,
                noExist:[fill,cover]
            }
        },
        {
            mix:{
                style:{
                    objectFit:'cover'
                }
            },
            conditions:{
                exist:cover,
                noExist:[fill,contain]
            }
        },
        {
            mix:{
                style:{
                    objectFit:'fill'
                }
            },
            conditions:{
                exist:fill,
                noExist:[contain,cover]
            }
        },{
            props:{
                src:darkSrc
            },
            conditions:{
                exist:[darkSrc],
                allTrue:[device.colorScheme == 'dark']
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
                {/*@ts-ignore */}
                <Image
                alt = {alt}
                sizes={"1000px"}
                {...image.props}
                />
        </div>
    
    </>
}