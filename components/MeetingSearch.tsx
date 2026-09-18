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
        <label className="mb-16 block w-full max-w-3xl rounded-3xl border border-[#800000]/15 bg-white p-6 shadow-[0_16px_36px_rgba(95,0,0,0.08)] sm:p-7">
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.18em] text-[#800000]">
                Find a meeting
            </span>
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="h-16 w-full rounded-2xl border-2 border-[#800000]/20 bg-white px-6 text-lg text-[#2c2522] shadow-sm outline-none transition placeholder:font-medium placeholder:text-[#800000] hover:border-[#800000]/45 focus:border-[#800000] focus:ring-4 focus:ring-[#800000]/10"
            />
        </label>
    );
}
