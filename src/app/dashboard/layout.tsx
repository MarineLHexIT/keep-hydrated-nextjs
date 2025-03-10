import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { DashboardHeader } from './components/header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
} 