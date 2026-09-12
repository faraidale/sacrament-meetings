import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { headers } from 'next/headers';

export default async function MeetingsPage() {
  // Dynamically grab the exact URL we are currently on
  const headerStore = await headers();
  const host = headerStore.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div className="w-full">
      <h2 className="text-3xl font-serif text-[#800000] mb-8 border-b-2 border-[#800000]/20 pb-4">All Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}