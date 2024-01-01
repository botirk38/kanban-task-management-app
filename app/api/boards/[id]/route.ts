import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function DELETE( request: NextRequest, { params} : { params : {id : string }}) {
 
 
  const cookieStore = cookies();
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Board ID is undefined' }), { status: 400 });
}


  const sessionId = cookieStore.get('sessionid')?.value;
  const csrfToken = cookieStore.get('csrftoken')?.value;

  try {
    const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/boards/${id}/`, {
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

export async function PATCH( request: NextRequest, {params} : { params: {id : string} } ) {
 
  const data = await request.json()
  console.log(" Board Data:", data)

  const cookieStore = cookies();
  const id = params.id;

  const sessionId = cookieStore.get('sessionid')?.value;
  const csrfToken = cookieStore.get('csrftoken')?.value;

  try {
    const response = await fetch (`https://kanban-a092a99fbf97.herokuapp.com/boards/${id}/`, {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
          'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(data),
        });



      const response_data = await response.json();
      
      if (!response.ok) {
        return new Response(JSON.stringify({ error: response_data }), { status: response.status });

      }

      return new Response(JSON.stringify(response_data), { status: 200 });
        
 
  }  catch (err) {
       console.error('Error deleting board on server: ', err);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

