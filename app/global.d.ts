import { StaticImageData } from "next/image"

export {}

declare global {
    type FixArray<T, L extends number> = readonly T[] & { length: L };

    interface APIResponse{
        status:'ok'|'error'|'unknown'
        code:number
        data:string|Array<object>|object|any
        error?:{
            status:number,
            message:string
        }
    }

    
    interface LastAction{
        title:string
        message:string
        type:'error'|'info'|'right'|'unknown'
    }

    interface SuccessAction{
        success?:{title:string,message:string,redirect?:string}
    }

    type FormAction = (prevState: any, formData: FormData)=>Promise<string>
}






