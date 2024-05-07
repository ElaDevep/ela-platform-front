'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import validateUserToken from "./validate_user_token"
import { set_cookie } from "../cookier"


export async function logIn(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
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
                code:200
            }
            set_cookie('userToken',res.data.data,'10:00')
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
        })
    }
    catch(error:any){
        response = {
            status:'error',
            code:error.response.status,
            data:error.response.data.data
        }
    }
    if(response.status == 'ok'){
        redirect('/recuperacion_contrasena')
    }
    return JSON.stringify(response)
}