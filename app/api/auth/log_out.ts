'use server'

import { delete_cookie } from "../cookier"

export default async function logOut(){
    await delete_cookie('userToken')
    await delete_cookie('userInfo')
    return true
}