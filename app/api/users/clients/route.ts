import { NextResponse } from "next/server"
import { axiosAPI } from "../../axiosAPI"
import { get_cookie } from "../../cookier"



export async function GET(request: Request) {
    let response:APIResponse<[User]> = {
        status:'unknown',
        code:0
    }
    const userToken = get_cookie('userToken')
    
    await axiosAPI.get('/auth/admin/usuariosCliente',{
        headers:{
            Authorization: `Bearer ${userToken}`,
        }
    })
    .then((res)=>{
        response = {
            status:'ok',
            data:res.data.data,
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
    
    return NextResponse.json(response)
}

