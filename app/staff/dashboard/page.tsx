import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Dashboard from '@/components/staff/Dashboard';

export const metadata: Metadata = {
  title: 'Staff Dashboard',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function StaffDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/staff/login?callbackUrl=/staff/dashboard');

  return (
    <Dashboard
      name={session.user.name || 'Greenfield Staff'}
      email={session.user.email || ''}
      role={(session.user as { role?: string }).role || 'editor'}
    />
  );
}
