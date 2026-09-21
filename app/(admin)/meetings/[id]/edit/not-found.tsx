import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="py-16 text-center">
            <h1 className="font-serif text-4xl text-[#800000]">Meeting not found</h1>
            <p className="mt-3 text-[#746963]">That meeting does not exist or may have been removed.</p>
            <Link href="/meetings" className="meeting-card-link mt-8">Back to meetings</Link>
        </div>
    );
}