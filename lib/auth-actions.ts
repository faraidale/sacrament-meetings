'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export async function authenticate(_previousState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirectTo: '/meetings/new',
        });
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') return 'Invalid email or password.';
            console.error('Authentication failed', error);
            return 'Unable to sign in right now. Please try again.';
        }

        throw error;
    }
}