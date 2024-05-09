'use server'

import { axiosAPI } from "../axiosAPI"

export default async function getClients(){
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }
    
    //console.log(token)
    await axiosAPI.get('/usuarios')
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
        console.log(error.response.data)
    })  
    
    return response
}