'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export default function ButtonSignOut() {
  const router = useRouter()

  async function handleSignOut() {
    await signOut({ redirect: false })
    router.replace('/')
  }

  return <Button onClick={() => handleSignOut()}>Sair</Button>
}
