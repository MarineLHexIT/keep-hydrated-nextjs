import { Suspense } from 'react';
import { getTodayStats } from '@/lib/api/water-intake';
import { getUserProfile } from '@/lib/api/user';
import { TodayIntakePresenter } from './today-water-intake-presenter';

function Loader() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Today's intake:</span>
      <span className="font-medium animate-pulse">Loading...</span>
    </div>
  );
}

function Error() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Today's intake:</span>
      <span className="font-medium text-destructive">Error loading data</span>
    </div>
  );
}

async function Data() {
  try {
    const stats = await getTodayStats();
    const { dailyGoal } = await getUserProfile();
    return <TodayIntakePresenter waterIntake={stats.total} dailyGoal={dailyGoal} />;
  } catch (error) {
    console.error('Failed to fetch water intake stats:', error);
    return <Error />;
  }
}

export function TodayWaterIntakeContainer() {
  return (
    <Suspense fallback={<Loader />}>
      <Data />
    </Suspense>
  );
} 