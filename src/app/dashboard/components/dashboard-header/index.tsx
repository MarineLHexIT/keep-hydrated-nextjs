import { auth } from '@/lib/auth/auth';
import UserMenu from './user-menu';
import { TodayWaterIntakeContainer } from './today-water-intake-container';

export async function DashboardHeader() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* App Name */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Keep Hydrated</h1>
          <TodayWaterIntakeContainer />
        </div>

        {/* User Menu */}
        <UserMenu userName={session.user.name || 'User'} />
      </div>
    </header>
  );
} 