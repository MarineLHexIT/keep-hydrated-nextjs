'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type TimePeriod = 'day' | 'week' | 'month';

interface TimePeriodSelectorProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export function TimePeriodSelector({ value, onChange }: TimePeriodSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onChange(value as TimePeriod)}
      className="flex items-center gap-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="day" id="day" />
        <label htmlFor="day" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Day
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="week" id="week" />
        <label htmlFor="week" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Week
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="month" id="month" />
        <label htmlFor="month" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Month
        </label>
      </div>
    </RadioGroup>
  );
} 