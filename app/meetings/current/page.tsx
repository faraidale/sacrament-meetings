import { redirect } from 'next/navigation';
import { getCurrentMeeting } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
    const meeting = getCurrentMeeting();

    if (meeting) {
        redirect(`/meetings/${meeting.id}`);
    }

    redirect('/meetings');
}