import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/type';

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:3000`;
}

export default async function MeetingsPage() {
    const res = await fetch(`${getBaseUrl()}/api/meetings`, { cache: 'no-store' });
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