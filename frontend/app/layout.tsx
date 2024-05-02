import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'SysCoffee',
  description: 'My SysCoffee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <Providers>
        <body className="">
          {children}
        </body>
      </Providers>
    </html>
  )
}
