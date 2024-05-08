'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { set_cookie } from "../cookier"
import type { NextRequest } from 'next/server'


export async function logIn(prevState: any,formData:FormData){
    let request:NextRequest
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    
    const body = {
        email:formData.get('email'),
        password:formData.get('password')
    }
    
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
    return JSON.stringify(response)
}