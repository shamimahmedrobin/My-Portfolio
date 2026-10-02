import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ResumeModal } from '@/components/ResumeModal';
import { HireModal } from '@/components/HireModal';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shamimahmedrobin.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Shamim Ahmed Robin',
  title: {
    default: 'Shamim Ahmed Robin',
    template: '%s | Shamim Ahmed Robin',
  },
  description: 'Shamim Ahmed Robin is a Web Developer and Digital Marketing Specialist based in Sylhet, Bangladesh. Founder & Lead Developer of StyleSphere, specializing in full-stack e-commerce platforms, Meta Ads, and performance marketing.',
  keywords: [
    'Shamim Ahmed Robin',
    'Shamim Robin',
    'Shamim Ahmed',
    'Web Developer Bangladesh',
    'Web Developer Sylhet',
    'Digital Marketing Specialist',
    'Front-End Developer',
    'Full Stack Developer',
    'StyleSphere Founder',
    'Social Media Manager',
    'Next.js Developer',
    'React Developer',
    'Meta Ads Specialist',
    'CRO Specialist',
    'Portfolio',
  ],
  authors: [{ name: 'Shamim Ahmed Robin', url: siteUrl }],
  creator: 'Shamim Ahmed Robin',
  publisher: 'Shamim Ahmed Robin',
  appleWebApp: {
    title: 'Shamim Ahmed Robin',
    statusBarStyle: 'default',
    capable: true,
  },
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Shamim Ahmed Robin | Web Developer & Digital Marketing Specialist',
    description: 'Founder & Lead Developer of StyleSphere. Specializing in high-performance web applications, modern e-commerce platforms, Meta Ads campaigns, and customer acquisition funnels.',
    url: siteUrl,
    siteName: 'Shamim Ahmed Robin',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Shamim Ahmed Robin - Web Developer & Digital Marketing Specialist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Ahmed Robin | Web Developer & Digital Marketing Specialist',
    description: 'Founder & Lead Developer of StyleSphere. Building scalable e-commerce platforms and high-converting marketing funnels.',
    creator: '@ShamimRobin10',
    images: [`${siteUrl}/og-image.png`],
  },
  verification: {
    google: 'hFFhFaZW2On7_i9Jni_sMqIqs4Fh0Fw1EQzHu7rc4Q0',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Shamim Ahmed Robin',
      alternateName: ['Shamim Robin', 'Shamim Ahmed'],
      url: siteUrl,
      description: 'Official portfolio of Shamim Ahmed Robin, Web Developer and Digital Marketing Specialist.',
      hasPart: [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/about`,
          name: 'About',
          description: 'Learn about Shamim Ahmed Robin, career journey, and technical expertise.',
          url: `${siteUrl}/about`,
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/experience`,
          name: 'Experience',
          description: 'Professional career timeline and roles at StyleSphere, TrustShopBD, and Fiverr.',
          url: `${siteUrl}/#experience`,
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/skills`,
          name: 'Skills',
          description: 'Technical stack, web frameworks, and digital marketing tools mastered by Shamim Ahmed Robin.',
          url: `${siteUrl}/skills`,
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/projects`,
          name: 'Projects',
          description: 'Featured modern web development projects, e-commerce stores, and high-converting landing pages.',
          url: `${siteUrl}/projects`,
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/contact`,
          name: 'Contact',
          description: 'Get in touch with Shamim Ahmed Robin for collaborations, development projects, or marketing consulting.',
          url: `${siteUrl}/contact`,
        },
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Navigation Sitelinks',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'About',
          description: 'About Shamim Ahmed Robin',
          url: `${siteUrl}/#about`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'Experience',
          description: 'Career Timeline & Roles',
          url: `${siteUrl}/#experience`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Skills',
          description: 'Technical and Marketing Skills',
          url: `${siteUrl}/#skills`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'Projects',
          description: 'Featured Web Development Projects',
          url: `${siteUrl}/#projects`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'Contact',
          description: 'Get In Touch',
          url: `${siteUrl}/#contact`,
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Shamim Ahmed Robin',
      alternateName: ['Shamim Robin', 'Shamim Ahmed'],
      jobTitle: 'Web Developer & Digital Marketing Specialist',
      description: 'Web Developer and Digital Marketing Specialist with hands-on experience building and managing e-commerce platforms, customer funnels, and performance marketing.',
      image: `${siteUrl}/profile.jpg`,
      url: siteUrl,
      email: 'mailto:shamimahmedrobin5@gmail.com',
      telephone: '+8801887353914',
      worksFor: {
        '@type': 'Organization',
        name: 'StyleSphere',
        url: 'https://stylesphere.com.bd',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Murarichand College, Sylhet',
      },
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
        'Next.js',
        'React.js',
        'TypeScript',
        'Tailwind CSS',
        'E-Commerce Development',
        'Conversion Rate Optimization (CRO)',
        'Digital Marketing',
        'Meta Ads (Facebook & Instagram)',
        'Search Engine Optimization (SEO)',
      ],
    },
  ],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="application-name" content="Shamim Ahmed Robin" />
        <meta name="apple-mobile-web-app-title" content="Shamim Ahmed Robin" />
        <meta property="og:site_name" content="Shamim Ahmed Robin" />
        <meta name="google-site-verification" content="hFFhFaZW2On7_i9Jni_sMqIqs4Fh0Fw1EQzHu7rc4Q0" />
        <meta name="google-site-verification" content="tnZQpj_TOyPq9gguuHLmJL1D_2iiMPOXVzWTBupOHAo" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
          <ResumeModal />
          <HireModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
