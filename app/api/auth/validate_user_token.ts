'use server'

import { axiosAPI } from "../axiosAPI"
export default async function validateUserToken(logInToken:string){
    let response:APIResponse = {
        status:'unknown',
        data:undefined,
        code:0
    }
    
    if(logInToken){
        //console.log(token)
        await axiosAPI.post('/auth/validate-token',{token:logInToken})
        .then((res)=>{
            response = {
                status:'ok',
                data:res.data.data.userId,
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
        })  
    }
    return response
}