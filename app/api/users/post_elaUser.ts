'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function postElaUser(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    
    const body = {
        name:formData.get('name'),
        lastname:formData.get('lastname'),
        mobile:formData.get('mobile'),
        idEnterprice:'Ela',
        email:formData.get('email'),
        role:formData.get('role')
    }
    
    const userToken = get_cookie('userToken')
    console.log(formData)
    await axiosAPI.post('/auth/admin/registerEla',body,{
        headers:{
            Authorization: `Bearer ${userToken}`,
        }
    })
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
        console.log(error.response.data)
    })  
    
    return JSON.stringify(response)
}

