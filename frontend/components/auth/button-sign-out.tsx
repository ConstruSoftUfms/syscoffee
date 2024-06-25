'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { toast } from 'sonner'

export default function ButtonSignOut() {
  const router = useRouter()

  async function handleSignOut() {
    await signOut({ redirect: false })

      toast.error("Você saiu, até breve!")

      router.push('/')
      router.refresh()
    
  }

  return <Button className='rounded-2xl text-1xl text-white font-bold border-none bg-red-800 hover:bg-red-900 ' 
  onClick={() => handleSignOut()}>Sair</Button>
}
