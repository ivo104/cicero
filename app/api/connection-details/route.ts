export async function GET() {
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const apiKey = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY;

  if (!url || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing LIVEKIT config' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      url,
      apiKey,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}