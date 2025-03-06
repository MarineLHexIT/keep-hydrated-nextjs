/**
 * Routes configuration for authentication flow
 */

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';

export const publicRoutes = [
  '/'
];

export const authRoutes = [
  '/login'
];

// Helper to check if a route is public
export function isPublicRoute(route: string) {
  return publicRoutes.includes(route);
}

// Helper to check if a route is an auth route
export function isAuthRoute(route: string) {
  return authRoutes.includes(route);
} 