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
        <label className="mb-16 block w-full max-w-2xl">
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="block h-14 w-full rounded-full border border-[#800000]/20 bg-white px-6 text-base text-[#2c2522] shadow-[0_2px_8px_rgba(95,0,0,0.12)] outline-none transition placeholder:font-medium placeholder:text-[#800000] hover:border-[#800000]/45 hover:shadow-[0_3px_12px_rgba(95,0,0,0.16)] focus:border-[#800000] focus:ring-4 focus:ring-[#800000]/10 sm:h-16 sm:text-lg"
            />
        </label>
    );
}
