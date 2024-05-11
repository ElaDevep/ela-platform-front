'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function putUser(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    const userId = (formData.get('_id'))?.toString()

    console.log(';v')
    console.log(formData)
    console.log(userId)
    
    const body = {
        name:formData.get('name'),
        lastname:formData.get('lastname'),
        mobile:formData.get('mobile'),
        idEnterprice:formData.get('idEnterprice'),
        email:formData.get('email'),
        role:'Cliente'
    }

    const userToken = get_cookie('userToken')
    if(userId){
        await axiosAPI.put('/auth/update/'+userId,body,{
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
    }
    else{
        response = {
            status:'error',
            code:400,
            data:'No se encuentra id'
        }

    }

    console.log(response)
    
    return JSON.stringify(response)
}