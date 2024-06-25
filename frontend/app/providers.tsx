'use client'

import { queryClient } from '@/lib/tanstack'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="flowix-cloud-theme"
      >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-center"/>
      </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
