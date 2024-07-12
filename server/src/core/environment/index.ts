import * as dotenv from 'dotenv';
dotenv.config();

// App
export const APP_PORT = process.env.APP_PORT;

// Database
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_PORT = +process.env.DATABASE_PORT;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;

// JWT
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
