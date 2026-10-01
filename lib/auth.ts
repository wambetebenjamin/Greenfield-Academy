import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'node:crypto';

/**
 * Staff accounts.
 *
 * Demo credentials ship with the project so the portal can be reviewed
 * straight away. In production set STAFF_USERS to a JSON array, for example:
 * [{"email":"p.kamau@greenfieldacademy.co.ke","password":"...","name":"Peter Kamau","role":"editor"}]
 */
type StaffUser = {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor';
};

const DEMO_USERS: StaffUser[] = [
  {
    email: 'principal@greenfieldacademy.co.ke',
    password: 'greenfield2025',
    name: 'Dr. Margaret Wanjiku',
    role: 'admin',
  },
  {
    email: 'staff@greenfieldacademy.co.ke',
    password: 'greenfield2025',
    name: 'Victor Omondi',
    role: 'editor',
  },
];

function staffUsers(): StaffUser[] {
  const raw = process.env.STAFF_USERS;
  if (!raw) return DEMO_USERS;
  try {
    const parsed = JSON.parse(raw) as StaffUser[];
    return Array.isArray(parsed) && parsed.length ? parsed : DEMO_USERS;
  } catch {
    console.error('[auth] STAFF_USERS is not valid JSON, falling back to demo users');
    return DEMO_USERS;
  }
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  pages: { signIn: '/staff/login', error: '/staff/login' },
  providers: [
    CredentialsProvider({
      name: 'Staff credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email || '').toLowerCase().trim();
        const password = credentials?.password || '';
        if (!email || !password) return null;

        const user = staffUsers().find((u) => u.email.toLowerCase() === email);
        if (!user) return null;
        if (!safeEqual(password, user.password)) return null;

        return { id: user.email, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? 'editor';
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = (token.role as string) ?? 'editor';
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'greenfield-development-secret-change-me',
};
