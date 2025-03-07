import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/auth/logout-button';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-6">
      <div className="rounded-lg border bg-card p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
              {session.user.email}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
} 