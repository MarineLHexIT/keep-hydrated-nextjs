import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export const { auth, handlers } = NextAuth(authConfig)
export * from './types'
export * from './auth.config'
