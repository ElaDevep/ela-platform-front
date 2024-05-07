'use server'

import { axiosAPI } from "../axiosAPI"
import ValidateRestoreToken from "./validate_restore_token"

export async function RestorePasswordAction(prevState: any,formData:FormData){
    let response:APIResponse<string>={
        status:'unknown',
        code:0,
        data:undefined
    }
    let userId
    const restoreToken = (formData.get('token'))?.toString()
    if(restoreToken){
        await ValidateRestoreToken(restoreToken)
        .then((res)=>{
            if(res.data){
                userId=res.data.userId
            }
        })
    }
    if(userId){
        const body = {
            userId:userId,
            password:formData.get('password'),
            confirmPassword:formData.get('confirmPassword')
        }
        if(body.password && body.confirmPassword){
            if(!(body.password.toString()).match(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*(?:\d\D*){4,}.*)(?=.*[!@#$%^&(){}*_\[\]]+)[a-zA-Z0-9!@#$%^&*_(){}\[\]]{12,}$/) || !(body.confirmPassword.toString()).match(/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*(?:\d\D*){4,}.*)(?=.*[!@#$%^&(){}*_\[\]]+)[a-zA-Z0-9!@#$%^&*_(){}\[\]]{12,}$/)){
                return JSON.stringify({
                    status:"Error",
                    code:401,
                    data:"Las contraseñas no son validas"
                })
            }
        }
        await axiosAPI.post('/reset-password',body)
        .then((res)=>{
            response = {
                status:'ok',
                code:200,
                data:res.data
            }
        }).catch((error)=>{
            response = {
                status:'error',
                code:400,
                data:error.response.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
            console.log(error.response.data)
        })  
    }
    console.log(response)   
    return JSON.stringify(response)
}