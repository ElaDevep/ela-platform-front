'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie, set_cookie } from "../cookier"
import logOut from "./log_out"
import validateUserToken from "./validate_user_token"

export default async function getCurrentUser(){
    const userToken = await get_cookie('userToken')
    let response:APIResponse<User> = {
        status:'unknown',
        data:undefined,
        code:0
    }
    let userId
    console.log('xs')
    console.log(userToken)
    if(userToken){
        userId = (await validateUserToken(userToken)).data
    }
    if(userId){
        await axiosAPI.get('/auth/user/'+userId)
        .then((res)=>{
            response = {
                status:'ok',
                data:res.data.data,
                code:200
            }
            set_cookie('userInfo',JSON.stringify(res.data.data))
        }).catch((error)=>{
            response = {
                status:'error',
                code:400,
                data:error.response.data.data,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
            logOut()
        })  
    }
    return response
}