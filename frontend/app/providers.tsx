'use client'

import { queryClient } from '@/lib/tanstack'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { CartProvider } from '@/context/CartContext';

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
      <CartProvider>
            {children}
            <Toaster richColors position="top-center" className='text-xl'/>
      </CartProvider>
      </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
