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
        <label className="relative block w-full max-w-md">
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-[#800000]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4.5 4.5" strokeLinecap="round" />
                </svg>
            </span>
            <input
                type="search"
                placeholder="Search meetings..."
                defaultValue={searchParams.get('query') ?? ''}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings by speaker, leader, or meeting type"
                className="block h-14 w-full rounded-full border-[3px] border-[#800000] bg-white pl-14 pr-6 text-base text-[#2c2522] shadow-[0_3px_12px_rgba(95,0,0,0.14)] outline-none transition placeholder:font-medium placeholder:text-[#746963] hover:shadow-[0_5px_16px_rgba(95,0,0,0.2)] focus:ring-4 focus:ring-[#800000]/15 sm:h-16 sm:text-lg"
            />
        </label>
    );
}
