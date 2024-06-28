import Sobre from '@/components/Sobre'
import ButtonSignOut from '@/components/auth/button-sign-out'
import { SignInDialog } from '@/components/auth/sign-in-dialog'
import { SignUpDialog } from '@/components/auth/sign-up-dialog'
import MenuNavegation from '@/components/navegationMenu'
import PlanosCard from '@/components/planos'
import ProdutosCarousel from '@/components/produtos-carousel'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from './api/auth/[...nextauth]/route'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carrinho } from '@/components/Carrinho'
import PainelUser from '@/components/PainelUser'


export default async function Home() {
  const session = await getServerSession(nextAuthOptions)
  const user = session?.user

  return (
    <>
      <header className="p-2 dark:bg-black flex justify-between items-center space-x-3 sticky top-0 z-10">
        
        <MenuNavegation/>
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <PainelUser/>

              <span className="text-white">
                <strong>{user.username}</strong>
              </span>
              {/* <ButtonSignOut /> */}
              {/* <ThemeSwitcher /> */}
              <Carrinho />

            </>
          ) : (
            <div className="space-x-3">
              <SignInDialog />
              <SignUpDialog />
              {/* <ThemeSwitcher /> */}
              <Carrinho />
            </div>
          )}
        </div>
      </header>
        <main className="flex flex-col items-center justify-center pt-14 md:pt-18 lg:pt-24 sm:h-lvh h-dvh md:h-dvh lg:h-screen relative"
          style={{
            backgroundImage:
              'url(https://static.vecteezy.com/system/resources/previews/023/010/450/non_2x/the-cup-of-latte-coffee-with-heart-shaped-latte-art-and-ai-generated-free-photo.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }} >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative flex flex-col items-center">
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-50 to-blue-500"
            >
              SysCoffe
            </h1>
            <p className="text-sm md:text-base lg:text-lg pb-10 sm:pb-20 md:pb-30 lg:pb-40 text-center mt-4 text-zinc-50">
              O Sabor que Conecta Você ao Melhor do Café!
            </p>
          </div>
        </main>
        <div className="mt-6">
        <section id="planos"> {/* Adiciona ID para a seção "Planos" */}
          <PlanosCard />
        </section>

        <section id="produtos"> {/* Adiciona ID para a seção "Produtos" */}
          <ProdutosCarousel />
        </section>

        <section id="sobre"> {/* Adiciona ID para a seção "Sobre" */}
          <Sobre />
        </section>
      </div>
    </>
  )
}
