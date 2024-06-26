import { StaticImageData } from "next/image"

export {}

declare global {
    type FixArray<T, L extends number> = readonly T[] & { length: L };


    //Api response
    interface APIResponse<T=string|Array<{[key:string]:any}>|{[key:string]:any}>{
        status:'ok'|'error'|'unknown'
        code:number
        data?:T 
        error?:{
            status:number,
            message:string
        }
    }

    //API Model responses

    interface User{
        _id:string
        name:string
        lastname:string
        email:string
        mobile:string
        password:string
        role:string
        approved:boolean
        imgProfile:string
        idEnterprice:string
    }

    interface Enterprise{
        _id:string
        nNit: number
        razonSocial: string
        direccion: string
        celular: number
        tipo: string
        fechaSubida:string
        ultimoDocumento:string,
        sede:string
    }

    interface Report{
        _id:string,
        nNit:string,
        [key:string]:any
    }


    //Last action in PageContext
    interface LastAction{
        title:string
        message:string
        type:'error'|'info'|'right'|'unknown'
    }

    interface SuccessAction{
        success?:{title:string,message:string,redirect?:string,function?:()=>any}
    }

    //Type for Form Actions
    type FormAction = (prevState: any, formData: FormData)=>Promise<string>

    //Current User Type
    interface CurrentUser {
        id:string,
        name:string,
        lastName:string,
        email:string,
        mobile:string
        imgProfile:string,
        role:string
        shortName:string,
        businessName:string,
        idEnterprise:string
    }

    
    export interface View{
        title:string
        route:string
        navAble:boolean
    }

    export interface Notification{
        _id:string
        empresaId:string
        titulo:string
        mensaje:string
        estado:'enviado'|'visto'|'confirmado'
        fecha:string
    }
}






