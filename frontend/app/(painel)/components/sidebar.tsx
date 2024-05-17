import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
import { MonitorPlay } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { SidebarLink } from './sidebar-link'

export async function Sidebar() {
  const session = await getServerSession(nextAuthOptions)
  const user = session?.user

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-inherit pb-4 pt-16">
      <div className="flex h-full flex-col items-center">
      
      <Image 
      className="w-40 h-40" 
      src={user?.foto_url || 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'}
      alt={user?.nome || 'Usuário'}
      width={1920}
      height={1080}
      />
    
        <nav className="justify-center space-y-6 pt-4">
          <SidebarLink href="/monitor">
            Editar Perfil
          </SidebarLink>
        </nav>
      </div>
    </aside>
  )
}
