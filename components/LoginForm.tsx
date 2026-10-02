'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/auth-actions';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="grid gap-5 rounded-2xl border border-[#800000]/10 bg-white p-6 shadow-sm sm:p-8">
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#2c2522]">Bishopric email</label>
                <input id="email" name="email" type="email" autoComplete="username" required aria-describedby="login-error" className="form-input" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#2c2522]">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required aria-describedby="login-error" className="form-input" />
            </div>
            <p id="login-error" role="alert" aria-live="polite" className="min-h-5 text-sm font-medium text-[#800000]">{errorMessage}</p>
            <button type="submit" disabled={isPending} className="meeting-card-link w-fit disabled:cursor-wait disabled:opacity-60">
                {isPending ? 'Signing in…' : 'Sign in'}
            </button>
        </form>
    );
}