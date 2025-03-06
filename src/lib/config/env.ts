/**
 * Environment variable configuration with type safety and validation
 */

// Define the shape of our environment variables
interface EnvVariables {
  // Server-side environment variables
  API_URL: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string;

  // Client-side environment variables (must be prefixed with NEXT_PUBLIC_)
  NEXT_PUBLIC_APP_URL: string;
}

// Helper function to get environment variables with type safety
function getEnvVar(key: keyof EnvVariables): string {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

// Validate that an environment variable is a valid URL
function validateUrl(url: string, variableName: string): string {
  try {
    new URL(url);
    return url;
  } catch (error) {
    throw new Error(`Invalid URL for ${variableName}: ${url}`);
  }
}

// Environment variables that must be defined in production
const REQUIRED_SERVER_ENV_VARS = [
  'API_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'PORT',
] as const;

// Environment variables that must be defined for the client
const REQUIRED_CLIENT_ENV_VARS = [
  'NEXT_PUBLIC_APP_URL',
] as const;

// Validate environment variables
function validateEnv() {
  const nodeEnv = process.env.NODE_ENV;

  // Only validate required variables in production
  if (nodeEnv === 'production') {
    for (const key of REQUIRED_SERVER_ENV_VARS) {
      if (!process.env[key]) {
        throw new Error(`Environment variable ${key} is required in production`);
      }
    }

    for (const key of REQUIRED_CLIENT_ENV_VARS) {
      if (!process.env[key]) {
        throw new Error(`Environment variable ${key} is required in production`);
      }
    }
  }

  // Validate URLs regardless of environment
  if (process.env.API_URL) {
    validateUrl(process.env.API_URL, 'API_URL');
  }
  if (process.env.NEXTAUTH_URL) {
    validateUrl(process.env.NEXTAUTH_URL, 'NEXTAUTH_URL');
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    validateUrl(process.env.NEXT_PUBLIC_APP_URL, 'NEXT_PUBLIC_APP_URL');
  }
}

// Run validation
validateEnv();

// Export environment variables with types
export const env = {
  // Server-side environment variables
  API_URL: getEnvVar('API_URL'),
  NEXTAUTH_URL: getEnvVar('NEXTAUTH_URL'),
  NEXTAUTH_SECRET: getEnvVar('NEXTAUTH_SECRET'),
  NODE_ENV: getEnvVar('NODE_ENV') as EnvVariables['NODE_ENV'],
  PORT: parseInt(process.env.PORT || '5000', 10),

  // Client-side environment variables
  APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL'),

  // Environment checks
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// Type helper for client-side env variables
export type ClientEnv = Pick<typeof env, 'APP_URL'>; 