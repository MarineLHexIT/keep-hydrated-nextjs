import type { Meta, StoryObj } from '@storybook/react';
import { WaterIntakePeriodItem } from '../app/dashboard/components/water-intake-period-item';

const meta: Meta<typeof WaterIntakePeriodItem> = {
  title: 'Dashboard/WaterIntakePeriodItem',
  component: WaterIntakePeriodItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WaterIntakePeriodItem>;

const sampleData = [
  { date: '2024-03-11', amount: 250 },
  { date: '2024-03-11', amount: 300 },
  { date: '2024-03-12', amount: 200 },
  { date: '2024-03-12', amount: 350 },
  { date: '2024-03-13', amount: 400 },
];

const weekData = [
  ...sampleData,
  { date: '2024-03-14', amount: 300 },
  { date: '2024-03-15', amount: 250 },
];

const monthData = [
  ...weekData,
  { date: '2024-03-20', amount: 300 },
  { date: '2024-03-21', amount: 400 },
  { date: '2024-03-22', amount: 350 },
];

export const DayView: Story = {
  args: {
    period: 'day',
    date: new Date('2024-03-11'),
    data: sampleData.filter(item => item.date === '2024-03-11'),
  },
};

export const WeekView: Story = {
  args: {
    period: 'week',
    date: new Date('2024-03-11'),
    data: weekData,
  },
};

export const MonthView: Story = {
  args: {
    period: 'month',
    date: new Date('2024-03-11'),
    data: monthData,
  },
}; 