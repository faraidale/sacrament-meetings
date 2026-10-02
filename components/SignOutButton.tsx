import { signOut } from '@/auth';

export default function SignOutButton() {
    return (
        <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
        }}>
            <button type="submit" className="rounded-full border border-[#800000]/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#800000] hover:bg-[#800000] hover:text-white">
                Sign out
            </button>
        </form>
    );
}