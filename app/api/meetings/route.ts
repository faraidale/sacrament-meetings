import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const meetings = await getMeetings('', 1, date);
  return NextResponse.json(meetings);
}