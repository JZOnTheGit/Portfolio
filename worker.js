export default {
    async fetch(request, env, ctx) {
        // Add CORS headers
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        };

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers });
        }

        // Only allow GET requests
        if (request.method !== 'GET') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), {
                status: 405,
                headers
            });
        }

        try {
            // Return the GitHub token from environment variable
            return new Response(JSON.stringify({
                token: env.GITHUB_TOKEN
            }), { headers });
        } catch (error) {
            return new Response(JSON.stringify({
                error: 'Failed to get GitHub token'
            }), {
                status: 500,
                headers
            });
        }
    }
}; 