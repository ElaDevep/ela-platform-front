'use server'

import { axiosAPI } from "@/app/_api/axiosAPI"
import { redirect } from "next/navigation"


export async function logInAction(prevState: any,formData:FormData){
    let response:APIResponse = {
        status:"unknown",
        data:''
    }
    
    const body = {
        email:formData.get('email'),
        password:formData.get('password')
    }

    await axiosAPI.post('/auth/login',body)
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data.data
        }
        console.log(res)
    })
    .catch((error)=>{
        response = {
            status:'error',
            data:error.response.data.data,
            error:{
                status:error.response.status,
                message:error.response.statusText
            }
        }
        console.log(error)
    })

    if(response.status == 'ok'){
        //redirect('/clientes')
    }

    return response
}