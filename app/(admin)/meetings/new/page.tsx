import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default function NewMeetingPage() {
    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="mb-3 font-serif text-4xl font-bold text-[#2c2522]">Create meeting</h1>
            <p className="mb-8 text-[#746963]">Add the agenda details for an upcoming sacrament meeting.</p>
            <MeetingForm action={createMeeting} />
        </div>
    );
}
