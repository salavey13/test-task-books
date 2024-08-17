"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Secret key for signing the tokens
const JWT_SECRET = 'your_secret_key'; // Store this securely, e.g., in environment variables
// Define roles
const ROLES = {
    USER: 0,
    ADMIN: 1,
};
// Generate a token for a user
function generateToken(userId, role) {
    const payload = {
        sub: userId,
        role: role,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
}
// Example usage
const testUserId = 'testuser'; // Use the existing user ID
const userRole = ROLES.USER;
const adminRole = ROLES.ADMIN;
const userToken = generateToken(testUserId, userRole);
const adminToken = generateToken(testUserId, adminRole); // Use the same ID for admin to test
console.log('User Token:', userToken);
console.log('Admin Token:', adminToken);
