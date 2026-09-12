'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="site-nav">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Home</Link>
            <Link href="/meetings" aria-current={pathname === '/meetings' ? 'page' : undefined}>All Meetings</Link>
            <Link href="/meetings/current" aria-current={pathname === '/meetings/current' ? 'page' : undefined}>Current Sunday</Link>
        </nav>
    );
}
