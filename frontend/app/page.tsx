import ButtonSignOut from '@/components/auth/button-sign-out'
import { SignInDialog } from '@/components/auth/sign-in-dialog'
import { SignUpDialog } from '@/components/auth/sign-up-dialog'
import PlanosCards from '@/components/planos-cards'
import ProdutosCarousel from '@/components/produtos-carousel'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(nextAuthOptions)
  const user = session?.user

  return (
    <>
      <header className="p-3 bg-gray-100 flex justify-end items-center space-x-3">
        {user ? (
          <>
            <span>
              Bem-vindo, <strong>{user.username}</strong>!
            </span>
            <ButtonSignOut />
          </>
        ) : (
          <SignInDialog />
        )}
        <SignUpDialog />
      </header>
      <main className="flex flex-col items-center pt-24">
        <h1 className="text-4xl font-bold">My Coffee Home page</h1>
      </main>
      <div className='mt-6'>
        <PlanosCards />
        <ProdutosCarousel />
      </div>
    </>
  )
}
