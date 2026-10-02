import Link from 'next/link';
import { deleteMeetingAction } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/type';

export default function MeetingCard({ meeting, canManage = false }: { meeting: SacramentMeeting; canManage?: boolean }) {
    // Format the date nicely for the UI
    const dateObj = new Date(meeting.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    return (
        <div className="meeting-card group">
            <div className="mb-7 flex items-start justify-between">
                <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#746963]">Sacrament meeting</p>
                    <h2 className="font-serif text-2xl font-bold text-[#2c2522]">{formattedDate}</h2>
                    <span className="mt-3 inline-block rounded-full bg-[#f4f1ea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#800000]">
                        {meeting.meetingType}
                    </span>
                </div>
            </div>

            <div className="mb-7 space-y-3 border-t border-[#800000]/10 pt-5">
                <p className="text-sm text-[#746963]"><strong className="mr-2 text-[10px] font-bold uppercase tracking-wider text-[#2c2522]">Presiding</strong> {meeting.presiding}</p>
                <p className="text-sm text-[#746963]"><strong className="mr-2 text-[10px] font-bold uppercase tracking-wider text-[#2c2522]">Conducting</strong> {meeting.conducting}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Link href={`/meetings/${meeting.id}`} className="meeting-card-link">
                    View Full Agenda &rarr;
                </Link>
                {canManage && (
                    <>
                        <Link href={`/meetings/${meeting.id}/edit`} className="rounded-full border border-[#800000]/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000]">
                            Edit
                        </Link>
                        <form action={deleteMeetingAction.bind(null, meeting.id)}>
                            <button type="submit" className="rounded-full border border-[#800000]/25 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000]">
                                Delete
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
