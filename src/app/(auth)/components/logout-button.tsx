'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({
        callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
        redirect: true
      })}
    >
      Log out
    </Button>
  );
} 