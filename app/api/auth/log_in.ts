'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { set_cookie } from "../cookier"
import type { NextRequest } from 'next/server'
import setCurrentUser from "./set_current_user"





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
            set_cookie('userToken',res.data.data,'10:00')
            response = {
                status:'ok',
                code:200
            }
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
    catch(e){
        response = {
            status:'error',
            code:500,
            data:'Error de servidor'
        }
    }
    if(response.status == 'ok'){
        await setCurrentUser()
        redirect('/home')
    }
    return JSON.stringify(response)
}