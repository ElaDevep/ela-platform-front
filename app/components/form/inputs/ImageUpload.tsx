'use client'

import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'
import styler from '../Form.module.sass'
import { read } from 'fs'
import useProps from '@/app/hooks/useProps'
import { UseForm } from '../hooks/useForm'
import { Frame } from '../../ela-components'
import uploadIcon from '@/public/svg/upload.svg'

export default function ImageUpload({
    className,
    name,
    form

}:Readonly<{
    name:string
    className?:string
    form:UseForm
}>){
    const inputRef = useRef<HTMLInputElement>(null)
    const [src,setSrc] = useState<string>()

    const inputContainer = useProps([{
        props:{
            className:styler.imageInput
        }
    },{
        mixClass:className
    }])

    // useEffect(()=>{
    //     inputContainer.mixClasses(styler.textField_error,{
    //         exist:[inputState.error]
    //     },true)
    // },[inputState.error])

    useEffect(()=>{
        if(inputRef){
            console.log(inputRef)
        }
        if(form.defaultValues){
            if(form.defaultValues[name]){
                console.log(form.defaultValues[name])
                setSrc(form.defaultValues[name])
            }
        }
    },[])

    const imageUploaded = (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files){
            if(e.target.files[0]){
                console.log(e.target)
                const reader = new FileReader()
                reader.onload = (e)=>{
                    console.log(e.target?.result)
                    if(typeof e.target?.result == 'string'){
                        setSrc(e.target?.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            }
        }
    }

    return <>
        <div {...inputContainer.props}>
            <img src={src} />
            <input name={name} id={name} type='file' ref={inputRef} onChange={(e)=>imageUploaded(e)}/>
            <label htmlFor={name}>
                <Frame
                    src={uploadIcon}
                    alt={'upload_img'}
                    className={styler.uploadIcon}
                    contain
                />
            </label>
        </div>
    </>
}