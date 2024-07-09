'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function getRoles(){
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }
    
    await axiosAPI.get('/roles')
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data.data,
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
    
    return response
}