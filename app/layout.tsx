import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Shamim Ahmed Robin | Portfolio',
  description: 'Premium portfolio website of Shamim Ahmed Robin, Professional Web Developer and Social Media Manager.',
  icons: {
    icon: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
    shortcut: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
    apple: 'https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg',
  },
  openGraph: {
    title: 'Shamim Ahmed Robin | Portfolio',
    description: 'Premium portfolio website of Shamim Ahmed Robin, Professional Web Developer and Social Media Manager.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shamim Ahmed Robin | Portfolio',
    description: 'Premium portfolio website of Shamim Ahmed Robin, Professional Web Developer and Social Media Manager.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg" />
        <link rel="apple-touch-icon" href="https://i.ibb.co/pjyc3JTC/IMG-20260918-155445.jpg" />
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
