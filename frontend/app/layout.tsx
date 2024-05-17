import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'SysCoffee',
  description: 'My SysCoffee',
}

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
        <body className={cn('font-sans antialiased', fontSans.variable)}>
          <Providers>{children}</Providers>
        </body>
    </html>
  )
}
