'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function postClient(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    
    const body = {
        name:formData.get('name'),
        lastname:formData.get('lastname'),
        mobile:formData.get('mobile'),
        idEnterprice:formData.get('idEnterprice'),
        email:formData.get('email'),
        imgProfile:'https://th.bing.com/th/id/R.93e43ffc7b737358e983ab55c1e989c9?rik=ReLo9kiyPU1msA&pid=ImgRaw&r=0',
        role:'Cliente'
    }
    
    const userToken = get_cookie('userToken')
    console.log(formData)
    await axiosAPI.post('/auth/admin/registerCliente',body,{
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

