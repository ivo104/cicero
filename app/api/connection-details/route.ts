import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk'; // ✅ this is the correct NPM package
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const serverUrl = process.env.LIVEKIT_URL;

  if (!apiKey || !apiSecret || !serverUrl) {
    return NextResponse.json({ error: 'Missing LiveKit environment variables' }, { status: 500 });
  }

  const roomName = `room-${uuidv4()}`;
  const participantName = `user-${uuidv4()}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  const token = await at.toJwt();

  return NextResponse.json({
    serverUrl,
    participantToken: token,
  });
}