'use client';

interface TodayIntakePresenterProps {
  waterIntake: number;
  dailyGoal: number;
}

export function TodayIntakePresenter({ waterIntake, dailyGoal }: TodayIntakePresenterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Today's intake:</span>
      <span className="font-medium">{waterIntake}ml</span>
      <span className="text-sm text-muted-foreground">/ {dailyGoal}ml</span>
    </div>
  );
} 