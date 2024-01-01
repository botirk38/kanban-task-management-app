import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const response = await fetch('https://kanban-a092a99fbf97.herokuapp.com/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include', // Include credentials for cross-origin requests
        });

        const response_data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ error: response_data }), { status: 400 });
        }

        // Create a new response to send back to the client
        const nextResponse = new NextResponse(JSON.stringify(response_data), { status: 200 });

        // Forward the `Set-Cookie` header from the Django response to the Next.js response
        const setCookieHeader = response.headers.get('Set-Cookie');
        if (setCookieHeader) {
            nextResponse.headers.set('Set-Cookie', setCookieHeader);
        }

        return nextResponse;

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

