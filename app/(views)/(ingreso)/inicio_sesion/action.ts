'use server'

import { axiosAPI } from "@/app/api/axiosAPI"
import axios from "axios"
import { redirect } from "next/navigation"


export async function logInAction(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        id:0,
        data:''
    }
    
    const body = {
        email:formData.get('email'),
        password:formData.get('password')
    }
    
    throw JSON.stringify(body)
    // try{
        // const responseF = await fetch('http://localhost:4000/auth/login',{
        //     method:'POST',
        //     body:formData
        // })
        // console.log(':v')
        // console.log(responseF)

        await axios.post('http://localhost:4000/auth/login',body)
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
    // }
    // catch(error){
    //     response = {
    //         status:'error',
    //         id:404,
    //         data:error
    //     }
    // }

    if(response.status == 'ok'){
        //redirect('/clientes')
    }
    return JSON.stringify(response)
}