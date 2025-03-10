'use client';

import { useState } from 'react';
import { TimePeriodSelector } from './time-period-selector';
import { WaterIntakePeriodItem } from './water-intake-period-item';
import { startOfDay, startOfWeek, startOfMonth } from 'date-fns';
import { WaterIntakeData } from '../actions';

type TimePeriod = 'day' | 'week' | 'month';

function groupDataByPeriod(data: WaterIntakeData[], period: TimePeriod) {
  const groupedData: { date: Date; data: WaterIntakeData[] }[] = [];

  // Group data by period
  data.forEach(item => {
    const itemDate = new Date(item.date);
    const periodStart = period === 'day' 
      ? startOfDay(itemDate)
      : period === 'week'
        ? startOfWeek(itemDate)
        : startOfMonth(itemDate);

    const existingGroup = groupedData.find(group => 
      group.date.getTime() === periodStart.getTime()
    );

    if (existingGroup) {
      existingGroup.data.push(item);
    } else {
      groupedData.push({
        date: periodStart,
        data: [item]
      });
    }
  });

  // Sort by date descending
  return groupedData.sort((a, b) => b.date.getTime() - a.date.getTime());
}

interface WaterIntakeHistoryProps {
  initialData: WaterIntakeData[];
}

export function WaterIntakeHistory({ initialData }: WaterIntakeHistoryProps) {
  const [period, setPeriod] = useState<TimePeriod>('day');
  const groupedData = groupDataByPeriod(initialData, period);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <TimePeriodSelector value={period} onChange={setPeriod} />
      </div>

      <div className="space-y-4">
        {groupedData.map(({ date, data }) => (
          <WaterIntakePeriodItem
            key={date.toISOString()}
            period={period}
            date={date}
            data={data}
          />
        ))}
      </div>
    </div>
  );
} 