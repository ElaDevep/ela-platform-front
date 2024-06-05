import { NextResponse } from "next/server"
import { get_cookie } from "../cookier"
import { axiosAPI } from "../axiosAPI"



export async function GET(request: Request) {
    let response:APIResponse<User> = {
        status:'unknown',
        code:0
    }

    await axiosAPI.get('/empresa/empresas')
    .then((res)=>{
        response = {
            status:'ok',
            data:(res.data.map((record:Enterprise)=>{
                const date = new Date(record.fechaSubida)
                record.fechaSubida = date.getDay().toString()
                console.log(record)
                return record
            })),
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
        console.log(error.response.data)
    })  
    
    //console.log(response.data)
    
    return NextResponse.json(response)
}

