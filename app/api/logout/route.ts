import { cookies } from "next/headers";

export async function POST(request: Request) {
	const cookieStore = cookies();
	const sessionID = cookieStore.get('sessionid')?.value;
	const csrfToken = cookieStore.get('csrftoken')?.value;


	try {
		const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
			method: 'POST',
			headers:
			{
				'Content-Type': 'application/json',
				'Cookie': `csrftoken=${csrfToken}; sessionid=${sessionID};`,
				'X-CSRFToken': csrfToken
			}
		});

		const response_data = await response.json();

		if (!response.ok) {

			return new Response(JSON.stringify({ error: response_data }), { status: 400 });
		}

		return new Response(JSON.stringify(response_data), { status: 200 });



	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });

	}

}
