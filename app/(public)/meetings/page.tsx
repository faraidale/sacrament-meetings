import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage(props: {
    searchParams?: Promise<{ query?: string; page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Math.max(1, Number(searchParams?.page) || 1);
    const [meetings, totalPages] = await Promise.all([
        getMeetings(query, currentPage),
        getMeetingsTotalPages(query),
    ]);

    return (
        <div className="w-full">
            <h2 className="text-3xl font-serif text-[#800000] mb-8 border-b-2 border-[#800000]/20 pb-4">All Meetings</h2>
            <MeetingSearch />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meetings.map((meeting) => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
            </div>
            {meetings.length === 0 && <p className="text-[#746963]">No meetings match your search.</p>}
            <Pagination totalPages={totalPages} />
        </div>
    );
}