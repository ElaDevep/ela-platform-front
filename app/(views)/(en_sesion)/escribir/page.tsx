'use client'
import { Editor } from '@tinymce/tinymce-react'
import styler from './page.module.sass'
import { useEffect, useRef } from 'react'
import { Form, Submit,TextField,useForm } from '@/app/components/form/ela-form'
import { usePageContext } from '@/app/context/PageContext'
import PostEditor from './PostEditor'
import { title } from 'process'

export default function WritePost(){
    const {currentUser,setLastAction} = usePageContext()

    useEffect(()=>{
        setLastAction({
            title:'Requisitos',
            message:'Recuerda poner un titulo H1 y por lo menos una imagen',
            type:'info'
        })
    },[])


    return <>
        <h2 className={styler.pageTitle_h}>Creación de blog <hr/></h2>
        {currentUser &&
            <PostEditor currentUser={currentUser}/>
        }
    </>
}