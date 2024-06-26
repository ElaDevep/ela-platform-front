import { axiosAPI } from "@/app/api/axiosAPI"
import { NextResponse } from "next/server"

export async function GET(request: Request, context: { params: {id:string}}) {
    let response:APIResponse<User[]> = {
        status:'unknown',
        code:0
    }

    console.log(context.params.id)

    await axiosAPI.get('/notificaciones/noti/'+context.params.id,{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
        //console.log(res)
        response = {
            status:'ok',
            data:res.data.map((item:Notification)=>{
                item.fecha = item.fecha.substring(0,10)
                return item
            }),
            code:200
        }
    }).catch((error)=>{
        console.log(error.response.data)
        if(error.response.data.error=='No se encontraron notificaciones para esta empresa'){
            response = {
                status:'ok',
                data:[],
                code:200
            }
        }
        else{
            response = {
                status:'error',
                code:400,
                data:error.response.data.error,
                error:{
                    status:error.response.status,
                    message:error.response.statusText
                }
            }
            console.log(error.response.data)
        }
    })  
    console.log(response)
    return NextResponse.json(response)
}

