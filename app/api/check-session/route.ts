import { cookies } from "next/headers";

export async function GET() {

	const cookieStore = cookies();
	const sessionID = cookieStore.get('sessionid')?.value;
	const csrfToken = cookieStore.get('csrftoken')?.value;


	try {

		const response = await fetch('http://127.0.0.1:8000/auth/check-session/', {
			headers: {
				'Content-Type': 'application/json',
				'Cookie': `sessionid=${sessionID}; csrftoken=${csrfToken}`,
			},
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
