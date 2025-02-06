export async function onRequest(context) {
    return new Response(JSON.stringify({
        token: context.env.GITHUB_TOKEN
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
} 