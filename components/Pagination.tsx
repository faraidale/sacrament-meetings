'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageUrl(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-between gap-4 border-t border-[#800000]/10 pt-6">
            {currentPage > 1 ? (
                <Link href={createPageUrl(currentPage - 1)} className="meeting-card-link">
                    Previous
                </Link>
            ) : <span />}
            <span className="text-sm font-semibold text-[#746963]">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages ? (
                <Link href={createPageUrl(currentPage + 1)} className="meeting-card-link">
                    Next
                </Link>
            ) : <span />}
        </nav>
    );
}
