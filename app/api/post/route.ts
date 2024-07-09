'use server'

import { NextResponse } from "next/server"
import { axiosAPI } from "../axiosAPI"

export async function GET(request: Request) {
    let response:APIResponse<[{[key:string]:any}]> = {
        status:'unknown',
        code:0
    }
    //console.log(token)
    await axiosAPI.get('/anuncios/unapproved_ads_blogs')
    .then((res)=>{
        response = {
            status:'ok',
            data:(res.data.data.map((record:{[key:string]:any})=>{
                record.fechaCreacion = record.fechaCreacion.toString().slice(0,10)
                record.author = record.name.split(' ')[0] + ' '+ record.lastname.split(' ')[0] 
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
       //console.log(error.response.data)
    })  
    
   //console.log(response.data)
    return NextResponse.json(response)
}

export async function PATCH(blog:{[key:string]:any},approved:boolean) {
    let response:APIResponse<{[key:string]:any}> = {
        status:'unknown',
        code:0
    }

    if(approved){
        await axiosAPI.patch('/anuncios/review/'+blog._id,{
            aprobado:true,
            revision:'completada'
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
    }
    else{
        await axiosAPI.delete('/anuncios/ads_blogs/'+blog._id)
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
        
       //console.log(response.data)
    }
    await axiosAPI.post('/notificaciones',approved?{
        empresaId: blog.idEnterprise,
        titulo: 'Blog publicado',
        mensaje: blog.title+' ha sido aprobado por la revision de ela, ahora todos pueden leerlo',
        estado: 'enviado'
    }:{
        empresaId: blog.idEnterprise,
        titulo: 'Blog rechazado',
        mensaje: blog.title+' ha sido negado por la revision de ela, ten encuenta los requisitos del blog, queremos saber lo que quieres dar a conocer',
        estado: 'enviado'

    },{
        headers:{
            Authorization: `Bearer userToken`,
        }
    })
    .then((res)=>{
       //console.log(res)
    }).catch((error)=>{
       //console.log(error)
        //console.log(error.response.data)
    })

    //return NextResponse.json(response)
}
