import bcrypt from 'bcryptjs';

const input = process.stdin;
if (!input.isTTY || typeof input.setRawMode !== 'function') {
    console.error('Run this helper directly in an interactive terminal.');
    process.exit(1);
}

input.setEncoding('utf8');
input.setRawMode(true);
input.resume();
process.stdout.write('Choose a bishopric password (input hidden): ');

let password = '';
input.on('data', async (chunk) => {
    for (const character of chunk) {
        if (character === '\u0003') {
            input.setRawMode(false);
            process.stdout.write('\nCancelled.\n');
            process.exit(1);
        }

        if (character === '\r' || character === '\n') {
            input.setRawMode(false);
            input.pause();
            process.stdout.write('\n');

            if (password.length < 12) {
                console.error('Use at least 12 characters, then run the helper again.');
                process.exit(1);
            }

            const hash = await bcrypt.hash(password, 12);
            password = '';
            console.log(`AUTH_ADMIN_PASSWORD_HASH=${hash}`);
            return;
        }

        if (character === '\u007f' || character === '\b') {
            password = password.slice(0, -1);
        } else {
            password += character;
        }
    }
});
