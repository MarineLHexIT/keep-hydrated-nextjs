'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserCircle } from 'lucide-react';

export function DashboardHeader() {
  const [waterIntake, setWaterIntake] = useState(0); // ml
  const dailyGoal = 2000; // ml

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* App Name */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Keep Hydrated</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Today's intake:</span>
            <span className="font-medium">{waterIntake}ml</span>
            <span className="text-sm text-muted-foreground">/ {dailyGoal}ml</span>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <UserCircle className="size-5" />
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/auth/logout">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 