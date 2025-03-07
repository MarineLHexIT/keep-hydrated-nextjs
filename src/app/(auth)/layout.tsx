import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  
  if (session?.user) {
    redirect('/dashboard');
  }

  return <div className="min-h-screen">{children}</div>;
} 