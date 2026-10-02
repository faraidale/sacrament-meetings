import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';
import { isOwnerCredentialsConfigured, isAuthSecretConfigured } from '@/lib/auth-status';

export const metadata: Metadata = {
    title: 'Bishopric sign in',
    description: 'Sign in to manage Colne Valley Ward sacrament meeting schedules.',
};

export default function LoginPage() {
    return (
        <section className="mx-auto w-full max-w-xl px-5 py-16 sm:px-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#800000]">Leader access</p>
            <h1 className="mb-3 font-serif text-4xl font-bold text-[#2c2522]">Sign in</h1>
            <p className="mb-8 text-[#746963]">Bishopric members can sign in to manage meeting agendas.</p>
            {(!isAuthSecretConfigured() || !isOwnerCredentialsConfigured()) && (
                <p role="status" className="mb-5 rounded-lg border border-[#800000]/15 bg-white p-4 text-sm text-[#746963]">
                    Authentication needs configuration before sign-in can be used. Set AUTH_SECRET, AUTH_ADMIN_EMAIL, and AUTH_ADMIN_PASSWORD_HASH in the deployment environment.
                </p>
            )}
            <LoginForm />
        </section>
    );
}