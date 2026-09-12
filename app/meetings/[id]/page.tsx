import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import { headers } from 'next/headers';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const headerStore = await headers();
  const host = headerStore.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;

  const { id } = await params;
  const res = await fetch(`${baseUrl}/api/meetings/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    notFound();
  }
  
  const meeting: SacramentMeeting = await res.json();
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <MeetingDetail meeting={meeting} />
    </div>
  );
}