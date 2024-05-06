'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import axios from "axios"
import { redirect } from "next/navigation"


export async function logInAction(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0,
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
                code:200,
                data:res.data.data
            }
            console.log(res)
        })
        .catch((error)=>{
            response = {
                status:'error',
                code:400,
                data:error.response.data.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
            console.log(error)
        })
    }
    catch(error:any){
        response = {
            status:'error',
            code:error.response.status,
            data:error.response.data.data
        }
    }
    
    return JSON.stringify(response)
}