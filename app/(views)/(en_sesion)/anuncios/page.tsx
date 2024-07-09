'use client'

import Link from 'next/link'
import styler from './page.module.sass'
import { useEffect, useState } from 'react'
import getPosts from '@/app/api/post/get_posts'
import PostCard from './PostCard'

export default function Posts(){
    const [posts,setPosts] = useState<{[key:string]:any}[]>()

    const gettingPosts = async()=>{
        const res = (await getPosts())
       //console.log(res)
        if(res.status = 'ok'){
            if(res.data){
                //@ts-ignore
                setPosts(res.data.data)
            }
        }
    }

    useEffect(()=>{
        gettingPosts()
    },[])

    return <>
        <Link
            className={styler.toWrite_link}
            href={'/escribir'}
        >
            <img src='/svg/plume_w.svg'/>
        </Link>
        <div className={styler.title_div}>
            <h2 className={styler.pageTitle_h}>Anuncios<hr/></h2>
        </div>
        <div className={styler.content_div}>
            <div className={styler.postList_div}>
                {posts && <>
                    {posts.map((post,index)=>{
                        return <PostCard post={post} key={index}/>
                    })}
                </>
                }

            </div>

        </div>
    </>
}