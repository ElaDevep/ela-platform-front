'use client'

import useProps from '@/app/hooks/useProps'
import styler from '../Form.module.sass'
import { Submit, useInput } from '../ela-form'
import { UseForm } from '../hooks/useForm'
import { Frame } from '../../ela-components'
import uploadIcon_w from '@/public/svg/uploadFile_w.svg'
import uploadIcon_d from '@/public/svg/uploadFile_d.svg'
import check from '@/public/svg/check.svg'
import { useEffect } from 'react'
import postWaterReport from '@/app/api/reports/agua/post_waterReport'

export default function FileInput({
    label,
    name,
    className,
    form,
    require,
    action
}:Readonly<{
    label?:string
    name:string
    className?:string,
    form:UseForm
    require?:boolean|{ message?:string}
    action:(prevState: any, formData: FormData)=> Promise<string>
}>){
    const inputState = useInput(form,{
        name:name,
        require:require
    })

    const inputContainer = useProps([{
        props:{
            className:styler.fileInput
        }
    },{
        mixClass:className
    }])

    useEffect(()=>{
        inputContainer.mixClasses(styler.fileSelected_div,{
            exist:[inputState.value]
        },true)
    },[inputState.value])

    return <>
        <div {...inputContainer.props}>
            {inputState.value ? 
            <>
                    <Frame
                        src={check}
                        alt='upload_icon'
                        className={styler.upload_frame}
                    />
                    <p>{(inputState.value.split('\\')).reverse()[0]} subido</p>
                    <button onClick={inputState.reset}>Cancelar</button>
                    <Submit
                        form={form}
                        action={action}
                        success={{
                            title:'Archivo subido',
                            message: 'El reporte ha sido actualizado',
                            function:()=>{inputState.reset()}
                        }}
                    >Aceptar</Submit>
            </>:
            <>
                <label htmlFor={name}>
                    <Frame
                        src={uploadIcon_w}
                        darkSrc={uploadIcon_d}
                        alt='upload_icon'
                        className={styler.upload_frame}
                    />
                    <p>Haga click para seleccionar el archivo</p>
                </label>
            </>
            }
            <input type='file' {...inputState.props}/>
        </div>
    </>
}