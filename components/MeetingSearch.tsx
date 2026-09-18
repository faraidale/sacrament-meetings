'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');

        if (term.trim()) {
            params.set('query', term.trim());
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <label className="mb-12 block max-w-2xl rounded-2xl border border-[#800000]/10 bg-white/70 p-4 shadow-[0_12px_30px_rgba(95,0,0,0.06)] sm:p-5">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-[#746963]">
                Find a meeting
            </span>
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="h-14 w-full rounded-xl border border-[#800000]/20 bg-[#faf8f4] px-5 text-base text-[#2c2522] shadow-inner shadow-[#800000]/[0.03] outline-none transition placeholder:text-[#746963]/70 hover:border-[#800000]/40 focus:border-[#800000] focus:bg-white focus:ring-4 focus:ring-[#800000]/10"
            />
        </label>
    );
}
