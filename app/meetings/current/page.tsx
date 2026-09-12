import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/types';

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:3000`;
}

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay(); 
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); 
  
  const isoDate = sunday.toISOString().split('T')[0];
  
  const res = await fetch(`${getBaseUrl()}/api/meetings?date=${isoDate}`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();
  
  if (meetings && meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  } else {
    redirect('/meetings');
  }
}