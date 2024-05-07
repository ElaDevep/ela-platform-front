'use server'
import { cookies } from "next/headers"

export async function get_cookie(name:string){
    const cookie = cookies().get(name)
    return cookie?.value
}

export async function set_cookie(name:string,value:string|undefined,expire?:string){
    if(value){
        if(expire){
            const expireArray = expire?.split(':')
            let expireTime = 1000
            for(let t of expireArray){
                expireTime *= parseInt(t)
            }
            cookies().set(name,value,{expires:expireTime})
        }
        else{
            cookies().set(name,value)
        }
    }
    else{
        return false
    }
}

export async function set_delete(name:string){
    cookies().delete(name)
}