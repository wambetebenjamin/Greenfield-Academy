import type { Metadata, Viewport } from 'next';
import './globals.css';
import AosProvider from '@/components/AosProvider';
import SessionProvider from '@/components/SessionProvider';
import { site } from '@/lib/site';

export const viewport: Viewport = {
  themeColor: '#1A6B3C',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Private Primary and Secondary School in Nairobi`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'school in Nairobi',
    'private school Kenya',
    'CBC school Nairobi',
    'IGCSE school Nairobi',
    'Greenfield Academy',
    'primary school Karen Nairobi',
    'secondary school Nairobi admissions 2025',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Nurturing Tomorrow's Leaders Today`,
    description: site.description,
    images: [
      {
        url: '/assets/images/main-slider-02.jpg',
        width: 1600,
        height: 800,
        alt: `${site.name} learners on graduation day`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Nurturing Tomorrow's Leaders Today`,
    description: site.description,
    images: ['/assets/images/main-slider-02.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <body>
        <SessionProvider>
          {children}
          <AosProvider />
        </SessionProvider>
      </body>
    </html>
  );
}
