import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: { signIn: '/staff/login' },
});

export const config = {
  matcher: ['/staff/dashboard/:path*'],
};
