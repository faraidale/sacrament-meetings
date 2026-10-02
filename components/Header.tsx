import NavLinks from './NavLinks';
import Link from 'next/link';
import { auth } from '@/auth';
import SignOutButton from './SignOutButton';
import { isAuthSecretConfigured } from '@/lib/auth-status';

export default async function Header() {
    const session = isAuthSecretConfigured() ? await auth() : null;
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <header className="border-b border-[#800000]/15 bg-[#f4f1ea]/90 backdrop-blur-sm">
            <div className="site-header-inner flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between">
                <div className="text-center md:text-left">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#800000]">Colne Valley Ward</p>
                    <h1 className="brand-title text-2xl font-bold tracking-tight">Sacrament Planner</h1>
                    <p className="mt-1 text-xs text-[#746963]">{today}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <NavLinks />
                    {session?.user ? (
                        <>
                            <Link href="/meetings/new" className="rounded-full border border-[#800000]/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:bg-[#800000] hover:text-white">Manage meetings</Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link href="/login" className="rounded-full border border-[#800000]/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:bg-[#800000] hover:text-white">Bishopric sign in</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
