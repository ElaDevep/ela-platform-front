import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    console.log(path)
    if(path.match(/^\/(?!inicio_sesion|recuperacion_contrasena).*$/)){
        return NextResponse.redirect(new URL('/inicio_sesion', request.url))
    }
    else{
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