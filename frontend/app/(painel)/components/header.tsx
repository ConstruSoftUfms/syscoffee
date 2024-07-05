import { ThemeSwitcher } from '@/components/theme-switcher'
import { UsersRound, ShoppingBag, User, Undo2 } from 'lucide-react'
import { HeaderLink } from './header-link'
import { Button } from '@/components/ui/button'
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b bg-inherit px-5 py-3 ">
      <div className="flex justify-between">
        <nav className="flex gap-6">
          <HeaderLink href="/admin">
            <UsersRound className="mr-0.5 size-4" />
            <span>Usuarios</span>
          </HeaderLink>
          <HeaderLink href="/admin/produtos">
            <ShoppingBag className="mr-0.5 size-4" />
            <span>Produtos</span>
          </HeaderLink>
          <HeaderLink href="/admin/planos">
            <ShoppingBag className="mr-0.5 size-4" />
            <span>Planos</span>
          </HeaderLink>

        </nav>
        <nav className="flex gap-2">
          <Link href="/" passHref>
              <Button variant="secondary">
                <Undo2 className="mr-0.5 size-4" />
                <span>Voltar ao site</span>
              </Button>
          </Link>

          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  )
}
