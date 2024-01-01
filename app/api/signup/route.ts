

export async function POST(request: Request){
	try {
		const data = await request.json();
		const response = await fetch('https://kanban-a092a99fbf97.herokuapp.com/auth/register/', {
			method: 'POST',
	        	headers: {
        		'Content-Type': 'application/json',
      			},
      			body: JSON.stringify(data),	
    	});




	const response_data = await response.json();

	if(!response.ok){
		return new Response(JSON.stringify({error: response_data}), {status: 400});
	}


	return new Response(JSON.stringify(response_data), {status: 200});

	}catch(err: any){
		
		return new Response(JSON.stringify({error: err.message}), {status:500});

	}

}
