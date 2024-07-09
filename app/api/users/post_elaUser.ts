'use server'

import { axiosAPI } from "../axiosAPI"
import { get_cookie } from "../cookier"

export default async function postElaUser(prevState: any,formData:FormData){
    let response:APIResponse & Object = {
        status:"unknown",
        code:0
    }
    
    const body = {
        name:formData.get('name'),
        lastname:formData.get('lastname'),
        mobile:formData.get('mobile'),
        idEnterprice:'Ela',
        email:formData.get('email'),
        role:formData.get('role'),
        password:'1234',
        imgProfile:'https://th.bing.com/th/id/R.93e43ffc7b737358e983ab55c1e989c9?rik=ReLo9kiyPU1msA&pid=ImgRaw&r=0',
        businessName:'__'
    }
    
    const userToken = get_cookie('userToken')
   //console.log(body)
    await axiosAPI.post('/auth/admin/registerEla',body,{
        headers:{
            Authorization: `Bearer ${userToken}`,
        }
    })
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data,
            code:200
        }
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
       //console.log(error.response.data)
    })  
    
    return JSON.stringify(response)
}

