'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import styler from './PostEditor.module.sass'
import { useForm } from '@/app/hooks/ela-hooks'
import { Editor } from '@tinymce/tinymce-react'
import Form from '@/app/components/form/Form'
import { Submit } from '@/app/components/form/ela-form'
import { usePageContext } from '@/app/context/PageContext'
import { title } from 'process'
import { useRouter } from 'next/navigation'
import postAnuncio from '@/app/api/post/post_anuncio'
import postBlog from '@/app/api/post/post_blog'

export default function PostEditor({currentUser}:Readonly<{currentUser:CurrentUser}>){
    const editorRef = useRef<Editor>(null)
    const postForm = useForm()
    const {setLastAction} = usePageContext()
    const [post,setPost] = useState<string>()
    const navigator = useRouter()

    const sendPost = async(e:FormEvent) =>{
        e.preventDefault()

       //console.log('🦅')
        
        const tempDoc = document.createElement('div')
        if(post && currentUser){
            tempDoc.innerHTML = post
            
            const date = new Date()
            let body:Post = ({
                id: currentUser.id+Math.random()*899999+1000000,
                contenido: "",
                idAutor: currentUser.id, 
                fechaCreacion: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
                idEnterprise: currentUser.idEnterprise,
                tipo: 'anuncio',
                calificacion: 5,
                nCalificacion: 0,
                resumen:"aaaaa"
            })

            if(body){
                body.contenido = post
                for(let i = 0; tempDoc.children.length>i ;i++){
                    if(tempDoc.children[i].tagName=='H1' && tempDoc.children[i].textContent != null){
                        //@ts-ignore
                        body.title = tempDoc.children[i].textContent
                    }
                    if(!body.imgFrontpage){
                        for(let j = 0; tempDoc.children[i].children.length>j ;j++){
                            if(tempDoc.children[i].children[j].tagName=='IMG'){
                                //@ts-ignore
                                body.imgFrontpage = tempDoc.children[i].children[j].src
                            }
                        }
                    }
                }
               //console.log(body)
                if(!body.title){
                    setLastAction({
                        title:'Invalido',
                        message:'Hace falta un titulo principal (H1)',
                        type:'error'
                    })
                    return
                }
                if(!body.imgFrontpage){
                    setLastAction({
                        title:'Invalido',
                        message:'Hace falta una imagen para la portada',
                        type:'error'
                    })
                    return
                }
            }
            if(currentUser.role == 'Cliente'){
                await postBlog(body).then((res)=>{
                   //console.log(res)
                    if(res.status=='ok'){
                        setLastAction({
                            title:'Blog enviado a revision',
                            message:'Lo mas pronto posible te haremos saber si tu blog se publico',
                            type:'right'
                        })
                        navigator.push('/anuncios')
                    }
                })
            }
            else{
                await postAnuncio(body).then((res)=>{
                   //console.log(res)
                    if(res.status=='ok'){
                        setLastAction({
                            title:'Anuncio publicado',
                            message:'Todos ya pueden ver el anuncio',
                            type:'right'
                        })
                        navigator.push('/anuncios')
                    }
                })
            }
        }
    }

    const handleUpdate = (value:any, editor:any) => {
        const editorContent= editor.getContent();
        setPost(editorContent)
    }


    return <>
    <form className={styler.writePost_form} onSubmit={sendPost}>
            {currentUser && 
            <>
                {(currentUser.role == 'Carga Información' ||currentUser.role == 'Cliente' )&&
                <button
                    className={styler.post_submit}
                >
                    <img src='/svg/sending.svg'/>
                </button >}
            </>
            }
            <Editor
                ref={editorRef}
                apiKey='wg9o54e0eta35x5vou33xgky663ypyn3pdbtsfvcxxkl5ocg'
                id='post'
                disabled={false}
                onEditorChange={handleUpdate}
                toolbar='bold italic underline h1 h2 image bullist numlist link'
                plugins={'image link lists'}
                textareaName='post'
            />
        </form>
    </>
}