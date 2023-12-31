import { cookies } from "next/headers";



export async function DELETE(request: Request) {


	const cookieStore = cookies();
	const sessionID = cookieStore.get('sessionid')?.value;
	const csrfToken = cookieStore.get('csrftoken')?.value;
	const user = await request.json();


	try {

		if (!sessionID || !csrfToken) {
			// Handle the error here, e.g., return a response or throw an error
			return new Response(JSON.stringify({ error: 'Session ID or CSRF token is missing' }), { status: 500 });
		  }
		  

		const response = await fetch('https://kanban-a092a99fbf97.herokuapp.com/auth/delete_account/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionID}; csrftoken=${csrfToken}`,
				'X-CSRFToken': csrfToken,
				'Referer': 'https://kanban-task-management-cfqa84nfr-botirk38s-projects.vercel.app'
			},

			body: JSON.stringify(user)

		});

		const response_data = await response.json();

		if (!response.ok) {
			return new Response(JSON.stringify({ error: response_data }), { status: response.status });

		}

		return new Response(JSON.stringify(response_data), { status: 200 });



	} catch (err: any) {
		console.error(err)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });

	}


}
