'use server'

import { axiosAPI } from "../axiosAPI"

export default async function ValidateRestoreToken(restoreToken:string){
    let response:APIResponse<{valid:boolean,userId:string}>={
        status:'unknown',
        code:0,
        data:undefined
    }
    const body = {
        token:restoreToken
    }
    await axiosAPI.post('/validate-token',body)
    .then((res)=>{
        response = {
            status:'ok',
            code:200,
            data:res.data
        }
    }).catch((error)=>{
        response = {
            status:'error',
            code:200,
            data:error.response.data
        }
       //console.log(error.response.data)
    })  
    return response
}