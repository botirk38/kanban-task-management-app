import { cookies } from "next/headers";
import { NextRequest } from "next/server";



export async function POST(request : NextRequest, { params } :  { params : { id : string, columnId: string } }) {
	
	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')?.value
	const csrfToken = cookieStore.get('csrftoken')?.value
	
	const boardId = params.id;
	const colId = params.columnId


	const req_data = await request.json();
	console.log("Task Data:", req_data)
	console.log('Session ID: ', sessionId)
	console.log('csrftoken: ', csrfToken)

	try {

		if (!sessionId || !csrfToken) {
			// Handle the error here, e.g., return a response or throw an error
			return new Response(JSON.stringify({ error: 'Session ID or CSRF token is missing' }), { status: 500 });
		  }
		  
		const response =  await fetch(`https://kanban-a092a99fbf97.herokuapp.com/${boardId}/columns/${colId}/tasks/`, {	

			method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
					'X-CSRFToken': csrfToken,
				},

			body: JSON.stringify(req_data)
		});
		
		const response_data = await response.json();

		
		if (!response.ok){
			      console.error("Response Error: ", response_data)
			      return new Response(JSON.stringify({ error: response_data }), { status: response.status });
		}
		return new Response(JSON.stringify(response_data), { status: 200 });

	} catch (err : any) {
		console.error(err)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
		

	}

}
