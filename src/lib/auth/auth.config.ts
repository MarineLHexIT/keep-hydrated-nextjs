import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '@/lib/validations/auth';

if (!process.env.API_URL) {
  throw new Error('API_URL must be defined in environment variables');
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        const parsedCredentials = loginSchema.safeParse(credentials);
        
        if (!parsedCredentials.success) {
          return null;
        }

        try {
          // 1. First login to get the token
          const loginResponse = await fetch(`${process.env.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          if (!loginResponse.ok) {
            throw new Error('Invalid credentials');
          }

          const loginData = await loginResponse.json();
          
          if (!loginData || !loginData.access_token) {
            throw new Error('Invalid response from server');
          }

          // 2. Then fetch the user profile using the token
          const profileResponse = await fetch(`${process.env.API_URL}/user/profile`, {
            headers: {
              'Authorization': `Bearer ${loginData.access_token}`,
              'Content-Type': 'application/json'
            }
          });

          if (!profileResponse.ok) {
            throw new Error('Failed to fetch user profile');
          }

          const profileData = await profileResponse.json();

          // 3. Return combined data
          return {
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            access_token: loginData.access_token,
            quickAccessToken: loginData.quick_access_token
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || undefined;
        token.name = user.name || undefined;
        token.access_token = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
}; 