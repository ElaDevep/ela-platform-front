'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function putUser(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    const userId = (formData.get('_id'))?.toString() ? (formData.get('_id'))?.toString() : (formData.get('id'))?.toString() 

    const fields = [
        'name',
        'lastname',
        'mobile',
        'email',
        'role',
        'idEnterprice'
    ]
    
    let body = {}

    for(let field of fields){
        if(formData.get(field)){
            Object.assign(body,{[field]:formData.get(field)})
        }
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