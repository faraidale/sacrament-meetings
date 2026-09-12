import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/type';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
    const meetings: SacramentMeeting[] = getMeetings();

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