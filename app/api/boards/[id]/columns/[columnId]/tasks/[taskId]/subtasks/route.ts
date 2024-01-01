import { cookies } from "next/headers";



export async function POST(request: Request, { params } : { params : {id : string, columnId: string, taskId: string } }) {

    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionid')?.value;
    const csrfToken = cookieStore.get('csrftoken')?.value;
    
    const boardId = params.id;
    const colId = params.columnId;
    const taskId = params.taskId;

    try {

        if (!sessionId || !csrfToken) {
            // Handle the error here, e.g., return a response or throw an error
            return new Response(JSON.stringify({ error: 'Session ID or CSRF token is missing' }), { status: 500 });
          }
          
        const requestBody = await request.json(); 

        const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/boards/${boardId}/columns/${colId}/tasks/${taskId}/subtasks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
                'X-CSRFToken': csrfToken,
                'Referer': 'https://kanban-task-management-cfqa84nfr-botirk38s-projects.vercel.app'
            },
            body: JSON.stringify(requestBody)
        });
	if (!response.ok) {
	    const errorResponse = await response.text();  // or response.json() if the server returns JSON
	    console.error("Server response:", errorResponse);
	    throw new Error(`HTTP error! Status: ${response.status}, Server response: ${errorResponse}`);
	}

        const responseData = await response.json();
        return new Response(JSON.stringify(responseData), { status: 200 });

    } catch (err) {
        console.error('Error:', err);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

