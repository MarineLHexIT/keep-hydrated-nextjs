import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return <div className="min-h-screen">{children}</div>;
} 