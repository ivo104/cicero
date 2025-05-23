import { NextResponse } from 'next/server';
import { AccessToken } from '@livekit/server-sdk';

export async function GET() {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!serverUrl || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Missing LiveKit config' }, { status: 500 });
  }

  const roomName = 'cicero-room'; // Optional: generate or customize per user
  const identity = `user-${Math.floor(Math.random() * 10000)}`;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    name: 'Voice Assistant User',
  });
  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();

  return NextResponse.json({
    serverUrl,
    participantToken: token,
  });
}