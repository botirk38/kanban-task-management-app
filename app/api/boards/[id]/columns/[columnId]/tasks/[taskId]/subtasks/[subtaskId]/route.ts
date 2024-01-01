import { cookies } from "next/headers";


export async function PATCH(request: Request, { params }: { params: { id: string, columnId: string, taskId: string, subtaskId: string } }) {
	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')?.value;
	const csrfToken = cookieStore.get('csrftoken')?.value;

	const boardId = params.id;
	const colId = params.columnId;
	const taskId = params.taskId;
	const subTaskId = params.subtaskId

	try {

		if (!sessionId || !csrfToken) {
			// Handle the error here, e.g., return a response or throw an error
			return new Response(JSON.stringify({ error: 'Session ID or CSRF token is missing' }), { status: 500 });
		  }
		  
		const subtask = await request.json();

		const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/${boardId}/columns/${colId}/tasks/${taskId}/subtasks/${subTaskId}/`, {

			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
				'X-CSRFToken': csrfToken,
				'Referer': 'https://kanban-task-management-cfqa84nfr-botirk38s-projects.vercel.app'
			},

			body: JSON.stringify(subtask)

		});

		if (!response.ok) {
			const errorResponse = await response.json();
			console.error("Server response:", errorResponse);
			throw new Error(`HTTP error! Status: ${response.status}, Server response: ${errorResponse}`);
		}

		const updated_subtask = await response.json();

		return new Response(JSON.stringify(updated_subtask), { status: 200 });



	} catch (err: any) {
		console.error('Error:', err);
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });


	}

}
