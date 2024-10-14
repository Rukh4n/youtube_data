import { categoryFunction } from '../../../libs/youtube'; // Adjust the path to your backend logic

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    if (!category) {
        return new Response(JSON.stringify({ error: 'Category parameter is required' }), {
            status: 400,
        });
    }

    try {
        const res = {
            method: 'GET',
            query: { category }, // Simulate the req.query for categoryFunction
        };
        const results = await categoryFunction(res);
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
