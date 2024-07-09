
import { cookies } from "next/headers"

export function get_cookie(name:string){
    const cookie = cookies().get(name)

    if(cookie?.value){
        try{
            //console.log(cookie.value)
            return JSON.parse(cookie.value)
        }catch(e){
            return cookie.value
        }
    }
}

export function set_cookie(name:string,value:string|undefined,expire?:string){
    
   //console.log(value)
    if(value){
        if(expire){
            const expireArray = expire?.split(':')
            let expireTime = 1000
            if(expireArray.length>5){
                throw new Error('Formato MM?:d?:hh?:mm?:ss no es cumplido')
            }

            let index = 0
            for(let t of expireArray){
                if(parseInt(t)!=0){
                    let time = parseInt(t)
                    switch(index){
                        case expireArray.length-1:
                            if(parseInt(t)>60) throw new Error('Formato MM?:d?:hh?:mm?:ss no es cumplido')
                            break
                        case expireArray.length-2:
                            if(parseInt(t)>60) throw new Error('Formato MM?:d?:hh?:mm?:ss no es cumplido')
                            time*=60
                            break
                        case expireArray.length-3:
                            if(parseInt(t)>24) throw new Error('Formato MM?:d?:hh?:mm?:ss no es cumplido')
                            time*=60*60
                            break
                        case expireArray.length-4:
                            if(parseInt(t)>7) throw new Error('Formato MM?:d?:hh?:mm?:ss no es cumplido')
                            time*=60*60*24
                            break
                        case expireArray.length-5:
                            time*=60*60*24*7
                            break
                    }
                    expireTime += time
                }
            }
            
            cookies().set(name,value,{maxAge:expireTime})
            return true
        }
        else{
            cookies().set(name,value)
            return true
        }
    }
    else{
        return false
    }
}

export async function delete_cookie(name:string){
    cookies().delete(name)
}