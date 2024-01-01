import { cookies } from 'next/headers'


export async function GET(){
	const cookieStore = cookies();
	const sessionID = cookieStore.get('sessionid')?.value;
	const csrfToken = cookieStore.get('csrftoken')?.value;

	try {
		const response = await fetch("https://kanban-a092a99fbf97.herokuapp.com/boards/", {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Cookie': `sessionid=${sessionID}; csrftoken=${csrfToken}`,
			
		},

	});

		const response_data = await response.json()

	if (!response.ok) {
	      return new Response(JSON.stringify({ error: response_data }), { status: response.status });
	}

	return new Response(JSON.stringify(response_data), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 400 });
	}	
	
}


	export async function POST(request: Request){

		const cookieStore = cookies();
		const sessionId = cookieStore.get('sessionid')?.value;
		const csrfToken = cookieStore.get('csrftoken')?.value;
		
		
			const data  = await request.json()

			if (!sessionId || !csrfToken) {
				// Handle the error here, e.g., return a response or throw an error
				return new Response(JSON.stringify({ error: 'Session ID or CSRF token is missing' }), { status: 500 });
			  }
			  

			const response = await fetch("https://kanban-a092a99fbf97.herokuapp.com/boards/", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
					'X-CSRFToken': csrfToken,
					'Referer': 'https://kanban-task-management-cfqa84nfr-botirk38s-projects.vercel.app'
				},
				body: JSON.stringify(data) 
			});

			const response_data = await response.json();

			if (!response.ok){
			      return new Response(JSON.stringify({ error: response_data }), { status: response.status });
			}
			return new Response(JSON.stringify(response_data), { status: 200 });
			
				
}



	
		
				
