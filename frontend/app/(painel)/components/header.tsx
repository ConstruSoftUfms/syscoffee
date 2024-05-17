import { ThemeSwitcher } from '@/components/theme-switcher'
import { DollarSign, ShoppingBag, User } from 'lucide-react'
import { HeaderLink } from './header-link'

export function Header() {
  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b bg-inherit px-5 py-3 ">
      <div className="flex justify-between">
        <nav className="flex gap-6">
          <HeaderLink href="/user">
            <User className="mr-0.5 size-4" />
            <span>Perfil</span>
          </HeaderLink>
          {/* <HeaderLink href="/produtos">
            <ShoppingBag className="mr-0.5 size-4" />
            <span>Produtos</span>
          </HeaderLink> */}
          <HeaderLink href="/planos">
            <DollarSign className="mr-0.5 size-4" />
            <span>Planos</span>
          </HeaderLink>
        </nav>
        <nav className="flex gap-2">
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
