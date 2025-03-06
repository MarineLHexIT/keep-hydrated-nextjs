import { env } from '@/lib/config/env';

export const siteConfig = {
  name: 'Water Intake Tracker',
  url: env.APP_URL,
  // ...
} as const; 