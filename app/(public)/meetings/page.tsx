import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import { isAuthSecretConfigured } from '@/lib/auth-status';

export const metadata: Metadata = {
    title: 'Sacrament Meetings',
    description: 'Browse upcoming Colne Valley Ward sacrament meeting schedules, leaders, and speakers.',
};

export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Math.max(1, Number(searchParams?.page) || 1);
    const [meetings, totalPages, session] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
        isAuthSecretConfigured() ? auth() : Promise.resolve(null),
    ]);

    return (
        <div className="w-full">
            <div className="mb-12 flex flex-row items-center justify-between gap-6 border-b-2 border-[#800000]/10 pb-6 max-[480px]:flex-col max-[480px]:items-stretch">
                <h2 className="m-0 whitespace-nowrap font-serif text-4xl text-[#800000]">All Meetings</h2>
                <div className="w-[min(32rem,60vw)] max-w-full shrink-0">
                    <MeetingSearch />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} canManage={Boolean(session?.user)} />
                ))}
            </div>
            {meetings.length === 0 && <p className="text-[#746963]">No meetings match your search.</p>}
            <Pagination totalPages={totalPages} />
        </div>
    );
}