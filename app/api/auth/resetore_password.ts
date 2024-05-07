'use server'

import { axiosAPI } from "../axiosAPI"

export default async function RestorePasswordAction(prevState: any,formData:FormData){
    let response:APIResponse<string>={
        status:'unknown',
        code:0,
        data:undefined
    }
    const body = {
        userId:formData.get('userId'),
        password:formData.get('password'),
        confirmPassword:formData.get('confirmPassword')
    }
    await axiosAPI.post('/reset-password',body)
    .then((res)=>{
        response = {
            status:'ok',
            code:200,
            data:res.data
        }
    }).catch((error)=>{
        response = {
            status:'error',
            code:200,
            data:error.response.data
        }
        console.log(error.response.data)
    })  
    console.log(response)
    return JSON.stringify(response)
}