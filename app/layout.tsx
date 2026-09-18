import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shamimahmedrobin.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Shamim Ahmed Robin | Web Developer & Social Media Manager',
  description: 'Official portfolio of Shamim Ahmed Robin. Professional Web Developer and Social Media Manager specializing in high-performance modern web apps and brand growth.',
  keywords: [
    'Shamim Ahmed Robin',
    'Shamim Robin',
    'Shamim Ahmed',
    'Web Developer Bangladesh',
    'Web Developer Sylhet',
    'Front-End Developer',
    'Full Stack Developer',
    'Social Media Manager',
    'Next.js Developer',
    'React Developer',
    'Meta Ads Specialist',
    'Portfolio',
  ],
  authors: [{ name: 'Shamim Ahmed Robin', url: siteUrl }],
  creator: 'Shamim Ahmed Robin',
  publisher: 'Shamim Ahmed Robin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
    shortcut: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
    apple: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
  },
  openGraph: {
    title: 'Shamim Ahmed Robin | Web Developer & Social Media Manager',
    description: 'Explore projects and digital solutions by Shamim Ahmed Robin, Professional Web Developer and Social Media Manager.',
    url: siteUrl,
    siteName: 'Shamim Ahmed Robin Portfolio',
    images: [
      {
        url: 'https://i.ibb.co/YFV88ZK6/profile.jpg',
        width: 800,
        height: 1000,
        alt: 'Shamim Ahmed Robin - Web Developer and Social Media Manager',
      },
    ],
    locale: 'en_US',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Ahmed Robin | Web Developer & Social Media Manager',
    description: 'Official portfolio of Shamim Ahmed Robin, Professional Web Developer and Social Media Manager.',
    creator: '@ShamimRobin10',
    images: ['https://i.ibb.co/YFV88ZK6/profile.jpg'],
  },
  verification: {
    google: 'hFFhFaZW2On7_i9Jni_sMqIqs4Fh0Fw1EQzHu7rc4Q0',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Shamim Ahmed Robin',
  alternateName: ['Shamim Robin', 'Shamim Ahmed'],
  jobTitle: 'Web Developer & Social Media Manager',
  description: 'Professional Web Developer and Social Media Manager bridging technical architecture and high-converting marketing strategies.',
  image: 'https://i.ibb.co/YFV88ZK6/profile.jpg',
  url: siteUrl,
  email: 'mailto:shamimahmedrobin5@gmail.com',
  telephone: '+8801887353914',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sylhet',
    addressCountry: 'Bangladesh',
  },
  sameAs: [
    'https://github.com/shamimahmedrobin',
    'https://www.linkedin.com/in/shamimahmedrobin',
    'https://www.facebook.com/shamimahmedrobin2',
    'https://x.com/ShamimRobin10',
  ],
  knowsAbout: [
    'Web Development',
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Social Media Marketing',
    'Meta Ads',
    'Search Engine Optimization (SEO)',
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="hFFhFaZW2On7_i9Jni_sMqIqs4Fh0Fw1EQzHu7rc4Q0" />
        <meta name="google-site-verification" content="tnZQpj_TOyPq9gguuHLmJL1D_2iiMPOXVzWTBupOHAo" />
        <link rel="icon" href="https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen antialiased selection:bg-blue-500/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
