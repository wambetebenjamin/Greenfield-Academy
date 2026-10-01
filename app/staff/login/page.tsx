import type { Metadata } from 'next';
import LoginForm from '@/components/staff/LoginForm';

export const metadata: Metadata = {
  title: 'Staff Portal Login',
  description: 'Secure sign in for Greenfield Academy staff.',
  robots: { index: false, follow: false },
};

export default function StaffLoginPage() {
  return <LoginForm />;
}
