import { Coffee } from 'lucide-react'
import { ReactNode } from 'react'

interface PerfilLayoutProps {
  children: ReactNode
}

export default async function PerfilLayout({ children }: PerfilLayoutProps) {
  return (
    <div className="container relative hidden min-h-screen flex-col items-center justify-center antialiased md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col border-r border-foreground/5 bg-muted p-10 text-muted-foreground dark:border-r lg:flex">
        <div className="flex items-center gap-3 text-lg font-medium text-foreground">
          <Coffee className="h-5 w-5" />
          <span className="font-semibold">SysCoffee</span>
        </div>
        <div className="mt-auto">
          <footer className="text-sm">
            Painel do usuario &copy; SysCoffee - {new Date().getFullYear()}
          </footer>
        </div>
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}