import { DefaultSession } from '@auth/core/types';

export interface UserInfo {
    id: string
    name: string
    email: string
    quickAccessToken: string
}

declare module 'next-auth' {
    interface User extends UserInfo {
        access_token: string
    }
        
    interface Session {
        access_token?: string
        user?: UserInfo & User & DefaultSession['user']
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        access_token?: string
        name?: string
        email?: string
    }
}