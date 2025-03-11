import { Metadata } from 'next';
import { LoginForm } from '@/app/(auth)/components/login-form';

export const metadata: Metadata = {
  title: 'Login | Water Intake Tracker',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
} 