import { Main } from '@/components/ui/main'
import { ReactNode } from 'react'
import { Header } from './components/header'

interface PerfilLayoutProps {
  children: ReactNode
}

export default async function PerfilLayout({ children }: PerfilLayoutProps) {
  return (
      <>
      <Header />
      <Main>
        {children}
      </Main>
    </>
  )
}