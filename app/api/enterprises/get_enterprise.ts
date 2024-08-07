'use server'

import { axiosAPI } from "../axiosAPI"

export default async function getEnterprise(userId:string){
    let response:APIResponse<Enterprise> = {
        status:'unknown',
        code:0
    }
    
    if(userId){
        //console.log(token)
        await axiosAPI.get('/empresa/empresas/'+userId)
        .then((res)=>{
            response = {
                status:'ok',
                data:res.data,
                code:200
            }
        }).catch((error)=>{
           //console.log(error.response)
            response = {
                status:'error',
                code:400,
                data:error.response.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
        })  
    }
    return response
}