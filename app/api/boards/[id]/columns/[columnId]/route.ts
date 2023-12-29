import { cookies } from "next/headers";
import { NextRequest } from "next/server";



export async function POST(request : NextRequest, { params } :  { params : { id : string, columnId: string } }) {
	
	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')
	const csrfToken = cookieStore.get('csrftoken')

	const boardId = params.id;
	const colId = params.columnId


	const req_data = await request.json();


	try {
		const response =  await fetch(`http://127.0.0.1:8000/boards/${boardId}/columns/${colId}/tasks/`, {	
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
        			'X-CSRFToken': csrfToken,
			},

			body: JSON.stringify(req_data)
		});
		
		const response_data = await response.json();

		
		if (!response.ok){
			      return new Response(JSON.stringify({ error: response_data }), { status: response.status });
			}
		return new Response(JSON.stringify(response_data), { status: 200 });

	} catch (err : any) {
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });

	}

}
