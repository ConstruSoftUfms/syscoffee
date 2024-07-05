import { Main } from '@/components/ui/main'
import { ReactNode } from 'react'
import { Header } from './components/header'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface PainelLayoutProps {
  children: ReactNode
}

export default async function PainelLayout({ children }: PainelLayoutProps) {
  const session = await getServerSession(nextAuthOptions)

  if (!session || !session.user?.is_admin) {
    redirect('/')
  }
  return (
      <>
      <Header />
      <Main>
        {children}
      </Main>
    </>
  )
}