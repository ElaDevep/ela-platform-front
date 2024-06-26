'use server'

import { axiosAPI } from "@/ela-axios"

export default async function putNotification(id:string,state:string){
    let response:APIResponse<string> = {
        status:'unknown',
        code:0
    }

    const body = {
        estado: state
    }

    await axiosAPI.put('/notificaciones/'+id,body,{
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