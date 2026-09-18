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
        <label className="block w-full max-w-4xl pb-16">
            <input
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="block h-20 w-full rounded-full border-4 border-[#800000] bg-white px-7 text-lg text-[#2c2522] shadow-[0_3px_12px_rgba(95,0,0,0.14)] outline-none transition placeholder:font-medium placeholder:text-[#800000] hover:shadow-[0_5px_16px_rgba(95,0,0,0.2)] focus:ring-4 focus:ring-[#800000]/15 sm:px-8 sm:text-xl"
            />
        </label>
    );
}
