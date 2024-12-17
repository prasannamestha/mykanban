import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { PHProvider, PostHogPageview } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MyKanban by UiBun',
  description:
    'Beautiful & free Kanban board for makers, indiehackers. Best open-source kanban board on the internet.',
  keywords:
    'best kanban board, kanban board, free kanban, free kanban board, free trello alternative, kanban system, free kanban system, beautiful kanban, task management, simple task management software',
  alternates: {
    canonical: 'https://www.uibun.dev/kanban',
  },
  openGraph: {
    title: 'MyKanban by UiBun',
    description: 'Beautiful & free Kanban board for personal use.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-zinc-900 to-neutral-950 text-white min-h-screen`}
        >
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
