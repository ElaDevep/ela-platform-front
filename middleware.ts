import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get_cookie } from './app/api/cookier'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const userToken = get_cookie('userToken')
    const userInfo = get_cookie('userInfo')
    
    // console.log(userToken)
    // console.log(userInfo)
    // console.log(':v')

    //console.log(path)
    if(path.match(/^\/(?!inicio_sesion|recuperacion_contrasena).*$/)){
        if(!(userToken)){
            return NextResponse.redirect(new URL('/inicio_sesion', request.url))
        }
        else{
            if(path.match(/^\/home$/)){
                switch(userInfo.role){
                    case 'Administrador':
                        return NextResponse.redirect(new URL('/usuarios', request.url))
                }
            }
        }
    }
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        {
            source:'/((?!api|_next/static|_next/image|favicon.ico|svg|jpg|png|ico).*)'
        }
    ],
}