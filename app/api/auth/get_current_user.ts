'use server'

import { get_cookie } from "../cookier"

export default async function getCurrentUser(){
    let response
    try{
        const userInfo = get_cookie('userInfo')
        response = {
            status:'ok',
            code:200,
            data:userInfo
        }

    }
    catch(e){
        response = {
            status:'error',
            code:500,
            data:'Error de servidor'
        }
    }

    return response
}