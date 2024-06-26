'use server'

import { axiosAPI } from "@/ela-axios"

export default async function postNotifications(prevState: any,formData:FormData){
    let response:APIResponse<string> = {
        status:'unknown',
        code:0
    }
    console.log(formData)

    const body = {
        empresaId: formData.get('empresaId'),
        titulo: formData.get('titulo'),
        mensaje: formData.get('mensaje'),
        estado: 'enviado'
    }

    await axiosAPI.post('/notificaciones',body,{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data.data,
            code:200
        }
    }).catch((error)=>{
        console.log(error)
        response = {
            status:'error',
            code:400,
            data:error.response.data.error,
            error:{
                status:error.response.status,
                message:error.response.statusText
            }
        }
        //console.log(error.response.data)
    })  

    return JSON.stringify(response)
}