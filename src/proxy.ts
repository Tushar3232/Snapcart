import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



const proxy = async (req: NextRequest) => {
    const { pathname } = req.nextUrl
    const token = await getToken({ req, secret: process.env.AUTH_SECRET })
    const publicRoutes = ["/login", "/register", "/favicon.ico"]
   
    if (publicRoutes.some((path) => pathname.startsWith(path))) {
        // if (token && pathname === "/login" || "/register") {
        //     return NextResponse.redirect(new URL("/dashboard", req.url));
        // }
        return NextResponse.next()
    }



    if (!token) {
        const loginUrl = new URL("/login", req.url)
        loginUrl.searchParams.set("callbackUrl", req.url)
        return NextResponse.redirect(loginUrl)
    }

    // Role bes Eaxcess
    const role = token.role 
    if(pathname.startsWith("/user") && role !=="user"){
        return NextResponse.redirect(new URL("/unauthorized",req.url))
    }
    if(pathname.startsWith("/delivery") && role !=="deliveryBoy"){
        return NextResponse.redirect(new URL("/unauthorized",req.url))
    }
    if(pathname.startsWith("/admin") && role !=="admin"){
        return NextResponse.redirect(new URL("/unauthorized",req.url))
    }

    return NextResponse.next()
};

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
}

export default proxy;