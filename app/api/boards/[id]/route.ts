import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function DELETE(request : NextRequest, { params} : { params : {id : string }}) {
 
 
  const cookieStore = cookies();
  const id = params.id;

  const sessionId = cookieStore.get('sessionid')?.value;
  const csrfToken = cookieStore.get('csrftoken')?.value;

  try {
    const response = await fetch(`http://127.0.0.1:8000/boards/boards/${id}/`, {
      method: 'DELETE',
      headers: {
        'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
        'X-CSRFToken': csrfToken,
      },
    });

    if (!response.ok) {
      const errorData = await response.text(); // Change to text() for safe parsing
      return new Response(errorData, { status: response.status });
    }

    return new Response(null, { status: 204 }); // Assume no content for successful DELETE

  } catch (err) {
    console.error('Error deleting board on server: ', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

