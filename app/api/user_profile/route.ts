import { cookies } from 'next/headers'


export async function GET() {
  const cookieStore = cookies();
  const sessionID = cookieStore.get('sessionid')?.value;
  const csrfToken = cookieStore.get('csrftoken')?.value;

  const response = await fetch('http://127.0.0.1:8000/auth/profile/', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `sessionid=${sessionID}; csrftoken=${csrfToken}`, 
    },

    });

  const response_data = await response.json();
  return Response.json(response_data);
}

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionID = cookieStore.get('sessionid')?.value;
  const csrfToken = cookieStore.get('csrftoken')?.value;

  try {
    const data = await request.json();

    const response = await fetch('http://127.0.0.1:8000/auth/profile/', {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `sessionid=${sessionID}; csrftoken=${csrfToken}`, 
        'X-CSRFToken': csrfToken,      
      },
      body: JSON.stringify(data)
    });

    const response_data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: response_data }), { status: response.status });
    }

    return new Response(JSON.stringify(response_data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}



		
