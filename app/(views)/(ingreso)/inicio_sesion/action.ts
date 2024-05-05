'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import { redirect } from "next/navigation"


export async function logInAction(prevState: any,formData:FormData){
    let response:APIResponse = {
        status:"unknown",
        id:0,
        data:''
    }
    
    const body = {
        email:formData.get('email'),
        password:formData.get('password')
    }
    
    try{
        await axiosAPI.post('/auth/login',body)
        .then((res)=>{
            response = {
                status:'ok',
                id:200,
                data:res.data.data
            }
            console.log(res)
        })
        .catch((error)=>{
            response = {
                status:'error',
                id:400,
                data:error.response.data.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
            console.log(error)
        })
    }
    catch(error){
        response = {
            status:'error',
            id:400,
            data:error
        }
    }

    if(response.status == 'ok'){
        //redirect('/clientes')
    }

    return response
}