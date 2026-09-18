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
        <label className="mb-8 block max-w-xl">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#746963]">
                Find a meeting
            </span>
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="w-full rounded-lg border border-[#800000]/20 bg-white px-4 py-3 text-sm text-[#2c2522] shadow-sm outline-none transition focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/15"
            />
        </label>
    );
}
