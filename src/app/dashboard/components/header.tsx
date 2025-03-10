import { auth } from '@/lib/auth/auth';
import { HeaderPresenter } from './header-presenter';

export async function DashboardHeader() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  // TODO: Fetch today's water intake from the API
  const waterIntake = 0;
  const dailyGoal = 2000;

  return (
    <HeaderPresenter
      waterIntake={waterIntake}
      dailyGoal={dailyGoal}
      userName={session.user.name || 'User'}
    />
  );
} 