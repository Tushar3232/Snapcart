import { NextRequest, NextResponse } from "next/server";



const async proxy = (req: NextRequest) => {
    const {pathname}=req.nextUrl
    const publicRoutes = {"/login","/register","/api/auth","favicon.ico","/_next"}
   if(publicRoutes.some((path)=>pathname.startsWith(path))){
    return NextResponse.next()
   }
};

export default proxy;