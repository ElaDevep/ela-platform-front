import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get_cookie } from './app/api/cookier'

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const userToken = get_cookie('userToken')
    const userInfo = get_cookie('userInfo')

    if(pathname.match(/^\/$/)){
        return NextResponse.redirect(new URL('/home', request.url))
    }

    if(!userToken){
        if(pathname.match(/^\/(?!inicio_sesion|recuperacion_contrasena).*$/)){
            return NextResponse.redirect(new URL('/inicio_sesion', request.url))
        }
    }
    else{
        if(userInfo){
            if(pathname.match(/^\/home$/)){
                switch(userInfo.role){
                    case 'Admin':
                        return NextResponse.redirect(new URL('/usuarios/clientes', request.url))
                }
            }
            if(pathname.match(/^\/(inicio_sesion|recuperacion_contrasena).*$/)){
                return NextResponse.redirect(new URL('/home', request.url))
            }
        }
            // else{
            //     return NextResponse.redirect(new URL('/usuarios/clientes', request.url))
            // }
    }
    
}

export const config = {
    matcher: [
        {
            source:'/((?!.*\/api|_next/static|_next/image|favicon.ico|svg|jpg|png|ico).*)'
        }
    ],
}