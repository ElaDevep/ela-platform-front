import { StaticImageData } from "next/image"

export {}

declare global {
    type FixArray<T, L extends number> = readonly T[] & { length: L };


    //Api response
    interface APIResponse<T=string|Array<object>|object>{
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


    //Last action in PageContext
    interface LastAction{
        title:string
        message:string
        type:'error'|'info'|'right'|'unknown'
    }

    interface SuccessAction{
        success?:{title:string,message:string,redirect?:string}
    }

    //Type for Form Actions
    type FormAction = (prevState: any, formData: FormData)=>Promise<string>

    //Current User Type
    interface CurrentUser {
        id:string,
        name:string[],
        lastName:string[],
        email:string,
        img:string,
        role:string
    }

    
    export interface View{
        title:string
        route:string
    }

}






