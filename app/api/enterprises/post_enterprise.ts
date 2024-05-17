'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function postEnterprise(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    
    const body = {
        nit:formData.get('nit'),
        razonSocial:formData.get('razonSocial'),
        direccion:formData.get('direccion'),
        celular:formData.get('celular'),
        tipo:formData.get('tipo'),
    }
    
    const userToken = get_cookie('userToken')
    console.log(formData)
    await axiosAPI.post('/empresa/empresas',body,{
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

