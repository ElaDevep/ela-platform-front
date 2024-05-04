import { StaticImageData } from "next/image"

export {}

declare global {
    type FixArray<T, L extends number> = readonly T[] & { length: L };

    interface APIResponse{
        status:'ok'|'error'|'unknown'
        data:string|Array<object>|object|any
        error?:{
            status:number,
            message:string
        }
    }
}






