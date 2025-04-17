import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    const provider = process.env.NEXT_PUBLIC_AUTH_PROVIDER
  
    if (provider === "supabase") {
      return await updateSession(request)
    }
  
    return NextResponse.next()
  }

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};