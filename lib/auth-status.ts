export function isAuthSecretConfigured() {
    return Boolean(process.env.AUTH_SECRET);
}

export function isOwnerCredentialsConfigured() {
    return Boolean(process.env.AUTH_ADMIN_EMAIL && process.env.AUTH_ADMIN_PASSWORD_HASH);
}