'use client'

import Link from 'next/link'
import styler from './page.module.sass'
import { useEffect, useReducer, useRef, useState } from 'react'
import getPosts from '@/app/api/post/get_posts'
import getPost from '@/app/api/post/get_post'
import { findDOMNode } from 'react-dom'
import PostCard from '../../../anuncios/PostCard'
import {PATCH as ApprovePost} from '@/app/api/post/route'
import { useRouter } from 'next/navigation'

export default function Post({params}:{params:{id:string}}){
    const [post,setPost] = useState<{[key:string]:any}>()
    const [content,setContent] = useState<Element[]>()
    const contentn = useRef<HTMLDivElement>(null)
    const navigator = useRouter()

    const gettingPosts = async()=>{
        const res = (await getPost(params.id))
       //console.log(res)
        if(res.status=='ok'){
            //@ts-ignore
            setPost(res.data.data)
        }
    }   

    useEffect(()=>{
        if(contentn.current){
            if(contentn.current.children.length == 1){
                if(post){
                    const contentDiv = document.createElement('div')
                    contentDiv.className = styler.content_div
                    contentDiv.innerHTML = post.contenido
                    const arr = Array.from(contentDiv.children).reverse()
                    arr.map((ele)=>{
                        //@ts-ignore
                        contentn.current?.prepend(ele)
                    })
                }
            }
        }   
    },[post])

    useEffect(()=>{
        gettingPosts()
    },[])

    return <>
        {post && <>
            <PostCard post={post}/>
            <div className={styler.center_div}>
                <div ref={contentn} className={styler.content_div}>
                    <div className={styler.authorInfo_div}>
                        <h3>Escrito por</h3>
                        <img src={post.imgProfile}/>
                        {(post.name) && <>
                            <span className={styler.authorName_span}>{post.name.split(' ')[0]+' '+((post.lastname)?(post.lastname.split(' ')[0]):'')}</span>
                        </>}
                        <span className={styler.authorEnterprise_span}>De {post.razonSocial}</span>
                        <span className={styler.authorDate_span}>{post.fechaCreacion.slice(0,10)}</span>
                    </div>
                </div>
            </div>
            <div className={styler.reviewButtons_div}>
                <button
                    onClick={()=>{
                        ApprovePost(post,true)
                        navigator.back()
                    }}
                >
                    <img src='/svg/simple_check.svg'/>
                </button>
                <button
                    onClick={()=>{
                        ApprovePost(post,false)
                        navigator.back()
                    }}
                >
                    <img src='/svg/simple_x.svg'/>
                </button>
            </div>
        </>}
    </>
}