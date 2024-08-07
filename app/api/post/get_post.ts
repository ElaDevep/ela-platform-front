'use server'

import { axiosAPI } from "../axiosAPI"

export default async function getPost(id:string){
    let response:APIResponse<Post> = {
        status:'unknown',
        code:0
    }
    //console.log(token)
    await axiosAPI.get('/anuncios/ads_blogs/'+id)
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data,
            code:200
        }
    }).catch((error)=>{
        response = {
            status:'error',
            code:400,
            data:error.response.data.data,
            error:{
                status:error.response.status,
                message:error.response.statusText
            }
        }
       //console.log(error.response.data)
    })  
    
   //console.log(response.data)
    return response
}