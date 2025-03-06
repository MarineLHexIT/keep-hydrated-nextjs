import { DefaultSession } from '@auth/core/types'

export interface UserInfo {
    id: string
    name: string
    email: string
    quickAccessToken: string
}

declare module 'next-auth' {
    interface User extends UserInfo {
        accessToken: string
    }
        
    interface Session {
        accessToken?: string
        user?: UserInfo & User & DefaultSession['user']
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        accessToken?: string
        firstName?: string
        lastName?: string
    }
}