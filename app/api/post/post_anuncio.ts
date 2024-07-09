'use server'

import { axiosAPI } from "@/ela-axios"
import { get_cookie } from "../cookier"
import { elements } from "chart.js"

export default async function postAnuncio(body:{[key:string]:any}){
    let response:APIResponse<string> = {
        status:'unknown',
        code:0
    }
   //console.log('Bv')
   //console.log(body)
    await axiosAPI.post('http://localhost:4000/anuncios/advert',body,{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data,
            code:200
        }
    }).catch((error)=>{
       //console.log(error)
        response = {
            status:'error',
            code:400,
            data:error.response,
            error:{
                status:500,
                message:':p'
            }
        }
        //console.log(error.response.data)
    })  

    return(response)
}