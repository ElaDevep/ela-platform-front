'use server'

import { axiosAPI } from "../axiosAPI"

export default async function RestorePasswordRequestAction(prevState: any,formData:FormData){
    let response:APIResponse = {
        status:'unknown',
        code:0,
        data:undefined
    }
    const body = {
        email:formData.get('email'),
    }
    await axiosAPI.post('/forgot-password',body)
    .then((res)=>{
        response = {
            status:'ok',    
            data:res.data,
            code:200
        }
        //console.log(res.data)
    }).catch((error)=>{
        if(error.response!=undefined){
            response = {
                status:'error',
                code:400,
                data:error.response.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
        }
       //console.log(error.response.data)
    })  
    return JSON.stringify(response)
}