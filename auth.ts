import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

const credentialsSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                const ownerEmail = process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase();
                const passwordHash = process.env.AUTH_ADMIN_PASSWORD_HASH;

                if (!parsed.success || !ownerEmail || !passwordHash) return null;
                if (parsed.data.email.trim().toLowerCase() !== ownerEmail) return null;

                try {
                    const passwordMatches = await bcrypt.compare(parsed.data.password, passwordHash);
                    if (!passwordMatches) return null;
                } catch {
                    return null;
                }

                return {
                    id: 'bishopric-admin',
                    name: 'Bishopric Administrator',
                    email: ownerEmail,
                };
            },
        }),
    ],
});