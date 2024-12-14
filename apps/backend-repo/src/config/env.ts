import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3883;
export const [FIRESTORE_URL, FIRESTORE_PORT] = process.env.FIRESTORE_EMULATOR_HOST?.split(':') || ['LOCALHOST', '8081'];
export const [STORAGE_URL, STORAGE_PORT] = process.env.STORAGE_EMULATOR_HOST?.split(':') || ['LOCALHOST', '9198'];
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';