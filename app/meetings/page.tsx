import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/type';

// Helper to get the correct URL whether on Localhost or Vercel
const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:3000`;
}

export default async function MeetingsPage() {
    const res = await fetch(`${getBaseUrl()}/api/meetings`, { cache: 'no-store' });
    const meetings: SacramentMeeting[] = await res.json();

    return (
        <div>
            <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#800000]/15 pb-7 sm:flex-row sm:items-end">
                <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#800000]">The calendar</p>
                    <h2 className="font-serif text-4xl font-bold text-[#2c2522]">All meetings</h2>
                </div>
                <p className="max-w-xs text-sm leading-6 text-[#746963]">Browse upcoming programs and open any meeting to see the full order of service.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
        </div>
    );
}
