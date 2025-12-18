import * as crypto from 'crypto';

// Function untuk membuat signature SHA-256
export function createSignature(queryString: string, secret: string): string {
    return crypto
        .createHmac('sha256', secret)
        .update(queryString)
        .digest('hex');
}