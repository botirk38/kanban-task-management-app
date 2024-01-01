import { cookies } from "next/headers";


export async function DELETE(request: Request, { params }) {
	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')?.value
	const csrfToken = cookieStore.get('csrftoken')?.value

	const boardId = params.id;
	const colId = params.columnId
	const taskId = params.taskId

	try {
		const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/boards/${boardId}/columns/${colId}/tasks/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
				'X-CSRFToken': csrfToken,
			},
		});

		if (!response.ok) {
			const response_data = await response.json(); // Only parse JSON if response is not ok
			console.error("Response Error: ", response_data);
			return new Response(JSON.stringify({ error: response_data }), { status: response.status });
		}

		return new Response(null, { status: 200 }); // No content to return for DELETE success
	} catch (err) {
		console.error(err)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}


export async function PUT(request: Request, { params }: { params: { id: string, columnId: string, taskId: string } }) {
	const updatedTask = await request.json();

	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')?.value
	const csrfToken = cookieStore.get('csrftoken')?.value

	const boardId = params.id;
	const colId = params.columnId
	const taskId = params.taskId


	try {
		const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/boards/${boardId}/columns/${colId}/tasks/${taskId}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify(updatedTask)


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

export async function PATCH(request: Request, { params }: { params: { id: string, columnId: string, taskId: string } }) {
	const updatedTask = await request.json();

	const cookieStore = cookies();
	const sessionId = cookieStore.get('sessionid')?.value
	const csrfToken = cookieStore.get('csrftoken')?.value

	const boardId = params.id;
	const colId = params.columnId
	const taskId = params.taskId


	try {
		const response = await fetch(`https://kanban-a092a99fbf97.herokuapp.com/boards/${boardId}/columns/${colId}/tasks/${taskId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify(updatedTask)


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
