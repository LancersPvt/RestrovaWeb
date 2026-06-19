import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");
    const path = searchParams.get("path");

    const secretToken = process.env.REVALIDATION_SECRET_TOKEN;

    if (!secretToken) {
        return NextResponse.json(
            { error: "Revalidation token is not configured on the server." },
            { status: 500 }
        );
    }

    if (token !== secretToken) {
        return NextResponse.json(
            { error: "Invalid revalidation token." },
            { status: 401 }
        );
    }

    if (!path) {
        return NextResponse.json(
            { error: "Missing 'path' query parameter." },
            { status: 400 }
        );
    }

    try {
        // Trigger Next.js revalidation for the specified path
        revalidatePath(path);
        
        return NextResponse.json({
            revalidated: true,
            path: path,
            timestamp: Date.now()
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: "Error revalidating path", message: err.message },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    const secretToken = process.env.REVALIDATION_SECRET_TOKEN;

    if (!secretToken) {
        return NextResponse.json(
            { error: "Revalidation token is not configured on the server." },
            { status: 500 }
        );
    }

    // Check token from headers or query params
    const token = request.headers.get("x-revalidate-token") || request.nextUrl.searchParams.get("token");

    if (token !== secretToken) {
        return NextResponse.json(
            { error: "Invalid revalidation token." },
            { status: 401 }
        );
    }

    let path = "";
    try {
        const body = await request.json();
        path = body.path;
    } catch (err) {
        // Fallback to query param
        path = request.nextUrl.searchParams.get("path") || "";
    }

    if (!path) {
        return NextResponse.json(
            { error: "Missing 'path' parameter in request body or query." },
            { status: 400 }
        );
    }

    try {
        revalidatePath(path);
        
        return NextResponse.json({
            revalidated: true,
            path: path,
            timestamp: Date.now()
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: "Error revalidating path", message: err.message },
            { status: 500 }
        );
    }
}
