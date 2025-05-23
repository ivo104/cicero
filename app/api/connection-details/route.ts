import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET() {
  const serverUrl = process.env.LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!serverUrl || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Missing LIVEKIT_URL, LIVEKIT_API_KEY, or LIVEKIT_API_SECRET' },
      { status: 500 }
    );
  }

  // Generate a random room and participant name
  const roomName = `room-${Math.floor(Math.random() * 10000)}`;
  const participantName = `participant-${Math.floor(Math.random() * 10000)}`;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });
  token.addGrant({ roomJoin: true, room: roomName });

  const accessToken = token.toJwt();

  return NextResponse.json({
    serverUrl,
    participantToken: accessToken,
  });
}