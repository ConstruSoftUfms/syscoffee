import NextAuthSessionProvider from '@/providers/sessionProvider'
import type { Metadata } from 'next'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const metadata: Metadata = {
  title: 'My Coffee',
  description: 'App My Coffee',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className="">
        <QueryClientProvider client={queryClient}>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
