import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/type';

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:3000`;
}

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const res = await fetch(`${getBaseUrl()}/api/meetings/${id}`, { cache: 'no-store' });

    if (!res.ok) {
        notFound(); // Triggers standard 404 page if ID doesn't exist or is invalid
    }

    const meeting: SacramentMeeting = await res.json();

    return (
        <div>
            <MeetingDetail meeting={meeting} />
        </div>
    );
}
