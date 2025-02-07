export async function onRequest(context) {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (context.request.method === 'OPTIONS') {
        return new Response(null, { headers });
    }

    try {
        return new Response(JSON.stringify({
            token: context.env.GITHUB_TOKEN
        }), { headers });
    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Failed to get token'
        }), {
            status: 500,
            headers
        });
    }
} 