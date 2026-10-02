import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const path = nextUrl.pathname;
            const isProtected = path === '/meetings/new' || /^\/meetings\/[^/]+\/edit$/.test(path);

            if (isProtected) return Boolean(auth?.user);
            if (auth?.user && path === '/login') {
                return Response.redirect(new URL('/meetings/new', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;