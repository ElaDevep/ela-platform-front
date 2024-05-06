'use server'

import { axiosAPI } from "../axiosAPI"

export default async function validateUserToken({logInToken}:Readonly<{logInToken:string}>){
    let response:APIResponse = {
        status:'unknown',
        data:undefined,
        code:0
    }
    
    if(logInToken != undefined){
        //console.log(token)
        await axiosAPI.post('/validate-token',{token:logInToken})
        .then((res)=>{
            response = res.data
        }).catch((error)=>{
            console.log(error.response.data)
        })  
    }
    return response
}