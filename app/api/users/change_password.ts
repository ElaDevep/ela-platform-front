'use server'

import { axiosAPI } from "@/ela-axios"
import { get_cookie } from "../cookier"

export default async function changePassword(prevState: any,formData:FormData){
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }
    
    const body = {
        currentPassword:formData.get('currentPassword'),
        newPassword:formData.get('newPassword'),
        confirmPassword:formData.get('confirmPassword'),
    }

    const userInfo = get_cookie('userInfo')
    const userToken = get_cookie('userToken')
    
    await axiosAPI.put('/change-password/'+userInfo._id,body,{
        headers:{
            Authorization: `Bearer ${userToken}`,
        }
    })
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
            data:error.response.data,
            error:{
                status:error.response.status,
                message:error.response.statusText
            }
        }
       //console.log(error.response.data)
    })  

    
    return JSON.stringify(response)
}