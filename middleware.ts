import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/inicio_sesion', request.url))
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        {
            source:'/((?!inicio_sesion|recuperacion_contrasena|api|_next/static|_next/image|favicon.ico|svg|jpg|png|ico).*)'
        }
    ],
}