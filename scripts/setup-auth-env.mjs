import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import bcrypt from 'bcryptjs';

if (!stdin.isTTY || typeof stdin.setRawMode !== 'function') {
    console.error('Run this helper directly in an interactive terminal.');
    process.exit(1);
}

const readline = createInterface({ input: stdin, output: stdout });
const email = (await readline.question('Bishopric admin email: ')).trim().toLowerCase();
readline.close();

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Enter a valid email address.');
    process.exit(1);
}

stdin.setEncoding('utf8');
stdin.setRawMode(true);
stdin.resume();
stdout.write('Choose a password with at least 12 characters (input hidden): ');

let password = '';
const chosenPassword = await new Promise((resolve, reject) => {
    stdin.on('data', (chunk) => {
        for (const character of chunk) {
            if (character === '\u0003') {
                reject(new Error('Cancelled.'));
                return;
            }
            if (character === '\r' || character === '\n') {
                stdin.setRawMode(false);
                stdin.pause();
                stdout.write('\n');
                if (password.length < 12) {
                    reject(new Error('Password must be at least 12 characters.'));
                    return;
                }
                resolve(password);
                return;
            }
            if (character === '\u007f' || character === '\b') password = password.slice(0, -1);
            else password += character;
        }
    });
});

const passwordHash = await bcrypt.hash(chosenPassword, 12);
password = '';
const values = {
    AUTH_SECRET: randomBytes(32).toString('base64url'),
    AUTH_ADMIN_EMAIL: email,
    AUTH_ADMIN_PASSWORD_HASH: passwordHash,
};

let envFile = '';
try {
    envFile = await readFile('.env.local', 'utf8');
} catch {
    // Create .env.local if this is a fresh checkout.
}

const lines = envFile.split(/\r?\n/).filter((line) => line && !Object.hasOwn(values, line.split('=')[0]));
for (const [key, value] of Object.entries(values)) {
    lines.push(`${key}=${JSON.stringify(value)}`);
}
await writeFile('.env.local', `${lines.join('\n')}\n`, { mode: 0o600 });
console.log('Auth settings saved to ignored .env.local. Do not commit this file.');
console.log('In Vercel Project Settings → Environment Variables, add AUTH_SECRET, AUTH_ADMIN_EMAIL, and AUTH_ADMIN_PASSWORD_HASH for Production and Preview.');
