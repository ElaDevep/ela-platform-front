'use server'

import { axiosAPI } from "../axiosAPI"

export default async function getEnterprises(){
    let response:APIResponse<Enterprise> = {
        status:'unknown',
        code:0
    }
    //console.log(token)
    await axiosAPI.get('/empresa/empresas')
    .then((res)=>{
        
        response = {
            status:'ok',
            data:(res.data.map((record:Enterprise)=>{
                record.fechaSubida = new Date(record.fechaSubida).getDate().toString()
               //console.log(record)
                return record
            })),
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
       //console.log(error.response.data)
    })  
    
   //console.log(response.data)
    return response
}