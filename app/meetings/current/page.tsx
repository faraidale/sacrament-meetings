import { redirect } from 'next/navigation';
import type { SacramentMeeting } from '@/lib/type';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    const isoDate = sunday.toISOString().split('T')[0];

    const meetings: SacramentMeeting[] = getMeetings(isoDate);

    if (meetings && meetings.length > 0) {
        redirect(`/meetings/${meetings[0].id}`);
    } else {
        redirect('/meetings');
    }
}