import { axiosAPI } from "@/app/api/axiosAPI"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, context: { params: {id:string}}) {
  let response:APIResponse<User[]> = {
    status:'unknown',
    code:0
}

await axiosAPI.delete('/admin/user/'+context.params.id,{
    headers:{
        Authorization: `Bearer userToken`,
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