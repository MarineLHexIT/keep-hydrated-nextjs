'use client';

import { format, startOfWeek, endOfWeek } from 'date-fns';
import { WaterIntakeData } from '../actions';

interface WaterIntakePeriodItemProps {
  period: 'day' | 'week' | 'month';
  date: Date;
  data: WaterIntakeData[];
}

export function WaterIntakePeriodItem({ period, date, data }: WaterIntakePeriodItemProps) {
  const getTitle = () => {
    switch (period) {
      case 'day':
        return format(date, 'd MMMM yyyy');
      case 'week': {
        const start = startOfWeek(date);
        const end = endOfWeek(date);
        return `Semaine ${format(date, 'w')} (${format(start, 'd MMM')} - ${format(end, 'd MMM')})`;
      }
      case 'month':
        return format(date, 'MMMM yyyy');
    }
  };

  const totalIntake = data.reduce((sum, item) => sum + item.amount, 0);
  const nbDays = Array.from(new Set(data.map((item) => item.date))).length;
  const averageIntake = Math.round(totalIntake / nbDays);

  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{getTitle()}</h3>
        <div className="text-2xl font-bold">{totalIntake}ml</div>
      </div>
      
      {(period === 'week' || period === 'month') && (
        <div className="mt-2 text-sm text-muted-foreground">
          Average daily intake: {averageIntake}ml
        </div>
      )}
    </div>
  );
} 