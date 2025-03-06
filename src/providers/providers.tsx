"use client"

import { type ReactNode } from "react"
import { QueryProvider } from "./query-provider"
import { NextAuthProvider } from "./session-provider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryProvider>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </QueryProvider>
    </>
  )
} 