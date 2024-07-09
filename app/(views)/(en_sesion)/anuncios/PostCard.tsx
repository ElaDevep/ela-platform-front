'use client'

import { useRouter } from 'next/navigation'
import styler from './PostCard.module.sass'

export default function PostCard({
    post,
    index
}:Readonly<{
    post:{[key:string]:any}
    index?:number
}>){   
    const navigator = useRouter()
    return <>
        <section className={styler.postCard} onClick={()=>navigator.push('/anuncios/'+post._id)}>
            <img src={post.imgFrontpage}/>
            <div className={styler.postInfo}>
                <img src={post.imgProfile}/>
                <h3>{post.title}</h3>
                {(post.name) && <>
                    <p>{post.name.split(' ')[0]+' '+((post.lastname)?(post.lastname.split(' ')[0]):'')}</p>
                </>}
                
                <span>{post.fechaCreacion.slice(0,10)}</span>
            </div>
        </section>
    </>
}