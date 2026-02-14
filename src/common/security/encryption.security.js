import crypto from "crypto";
import { envVars } from "../../../config/index.js";

/**
 * Encryption and Decryption utilities using AES-256-GCM
 */

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // For AES, this is always 16
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;
const TAG_POSITION = SALT_LENGTH + IV_LENGTH;
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH;


const getKey = (secret, salt) => {
    return crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha512");
};


export const encrypt = (value) => {
    if (!value) return value;

    const iv = crypto.randomBytes(IV_LENGTH);
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = getKey(envVars.encryptionKey, salt);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([
        cipher.update(String(value), "utf8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString("hex");
};


export const decrypt = (encryptedValue) => {
    if (!encryptedValue) return encryptedValue;

    const stringValue = Buffer.from(String(encryptedValue), "hex");

    const salt = stringValue.subarray(0, SALT_LENGTH);
    const iv = stringValue.subarray(SALT_LENGTH, TAG_POSITION);
    const tag = stringValue.subarray(TAG_POSITION, ENCRYPTED_POSITION);
    const encrypted = stringValue.subarray(ENCRYPTED_POSITION);

    const key = getKey(envVars.encryptionKey, salt);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    return decipher.update(encrypted) + decipher.final("utf8");
};
