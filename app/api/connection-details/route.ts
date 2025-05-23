import { NextResponse } from 'next/server';
import { createLocalParticipantToken } from '@livekit/components-core';

export async function GET() {
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!serverUrl || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Missing LiveKit environment variables' },
      { status: 500 }
    );
  }

  const roomName = `room-${Math.floor(Math.random() * 9999)}`;
  const participantName = `user-${Math.floor(Math.random() * 9999)}`;
  const token = createLocalParticipantToken({
    host: serverUrl,
    room: roomName,
    participantName,
    apiKey,
    apiSecret,
  });

  return NextResponse.json({
    serverUrl,
    participantToken: token,
  });
}