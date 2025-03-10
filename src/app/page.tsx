import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  if (isAuthenticated) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
