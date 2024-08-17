// backend/src/services/authService.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your environment variables

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateJwtToken(userId: number): string {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
}
