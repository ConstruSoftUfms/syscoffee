import { Main } from '@/components/ui/main'
import { ReactNode } from 'react'
import { Header } from './components/header'
import { Sidebar } from './components/sidebar'

interface PerfilLayoutProps {
  children: ReactNode
}

export default async function PerfilLayout({ children }: PerfilLayoutProps) {
  return (
      <>
      <Header />
      <Sidebar />
      <Main>
        {children}
      </Main>
    </>
  )
}