import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/type';

const getBaseUrl = () => {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:3000`;
}

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15 requires us to 'await' the params here too
    const resolvedParams = await params;
    const res = await fetch(`${getBaseUrl()}/api/meetings/${resolvedParams.id}`, { cache: 'no-store' });

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