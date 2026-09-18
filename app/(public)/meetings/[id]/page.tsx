import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/type';
import { getMeetingById } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const meeting: SacramentMeeting | null = await getMeetingById(Number(resolvedParams.id));

    if (!meeting) {
        notFound();
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <MeetingDetail meeting={meeting} />
        </div>
    );
}