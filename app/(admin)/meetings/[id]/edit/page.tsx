import MeetingForm from '@/components/MeetingForm';
import { updateMeetingAction } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id);
    const meeting = await getMeetingById(id);
    if (!meeting) notFound();

    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="mb-3 font-serif text-4xl font-bold text-[#2c2522]">Edit meeting</h1>
            <p className="mb-8 text-[#746963]">Update the agenda details and save your changes.</p>
            <MeetingForm action={updateMeetingAction.bind(null, id)} meeting={meeting} />
        </div>
    );
}