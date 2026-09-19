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
        <div className="relative block w-full">
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 fill-none stroke-[#800000]"
                strokeWidth="2"
            >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4.5 4.5" strokeLinecap="round" />
            </svg>
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="block h-16 w-full rounded-full border-2 border-[#800000]/30 bg-white pl-14 pr-6 text-lg text-[#2c2522] shadow-md outline-none transition placeholder:font-medium placeholder:text-[#746963] focus:border-[#800000] focus:ring-4 focus:ring-[#800000]/20"
            />
        </div>
    );
}
