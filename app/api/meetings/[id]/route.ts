import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Next.js 15 requires us to 'await' the params
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }
  
  const meeting = getMeetingById(id);
  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }
  
  return NextResponse.json(meeting);
}