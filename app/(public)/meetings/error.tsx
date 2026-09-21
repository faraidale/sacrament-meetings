'use client';

import Link from 'next/link';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return (
        <div className="py-16 text-center">
            <h1 className="font-serif text-4xl text-[#800000]">Something went wrong</h1>
            <p className="mt-3 text-[#746963]">We could not load the meeting information.</p>
            <div className="mt-8 flex justify-center gap-4">
                <button type="button" onClick={() => reset()} className="meeting-card-link">Try again</button>
                <Link href="/meetings" className="meeting-card-link">Back to meetings</Link>
            </div>
        </div>
    );
}