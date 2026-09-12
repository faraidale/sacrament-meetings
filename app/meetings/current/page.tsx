import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';
import { headers } from 'next/headers';

export default async function CurrentMeetingPage() {
  const headerStore = await headers();
  const host = headerStore.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const today = new Date();
  const dayOfWeek = today.getDay(); 
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); 
  
  const isoDate = sunday.toISOString().split('T')[0];
  
  const res = await fetch(`${baseUrl}/api/meetings?date=${isoDate}`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();
  
  if (meetings && meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  } else {
    redirect('/meetings');
  }
}