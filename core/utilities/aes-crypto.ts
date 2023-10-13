/*
 * File: aes-crypto.ts
 * File Created: 2023-10-06 08:39:48
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 02:37:16
 * Modified By: Val Liu
 * -----
 */

import * as crypto from "crypto-js";

export function AESEncrypt(input: string): string {
    return crypto.AES.encrypt(input, getAESKey()).toString();
}

export function AESDecrypt(encrypted: string): string {
    return crypto.AES.decrypt(encrypted, getAESKey()).toString(crypto.enc.Utf8);
}

/// internal
function getAESKey(): string {
    const key = process.env.AUTH_AES_KEY;
    if (key == undefined) throw new Error("AUTH_AES_KEY undefined.");
    return key;
}
