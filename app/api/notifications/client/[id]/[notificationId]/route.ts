import { axiosAPI } from "@/app/api/axiosAPI"
import { NextResponse } from "next/server"

export async function GET(request: Request, context: { params: {notificationId:string}}) {
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }

    await axiosAPI.get('/notificaciones/'+context.params.notificationId,{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
        console.log(res)
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
        console.log(error.response.data)
    })  

    return NextResponse.json(response)
}

export async function DELETE(request: Request, context: { params: {notificationId:string}}) {
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }

    await axiosAPI.delete('/notificaciones/'+context.params.notificationId,{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
        console.log(res)
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
        console.log(error.response.data)
    })  

    return NextResponse.json(response)
}