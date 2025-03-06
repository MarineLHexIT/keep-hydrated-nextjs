import { redirect } from "next/navigation"
import { auth } from "@/lib/auth/auth"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  )
} 