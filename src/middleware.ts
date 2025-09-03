import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/history") {
        // In a real world, this would verify user JWT token by calling backend API
        // to prevent user to access admin page
        // but since not in authentication not in requirement so we skip this part first
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/history"],
};
