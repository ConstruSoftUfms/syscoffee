import { ReactNode } from 'react'

export function Main({ children }: { children: ReactNode }) {
  return <main className="mx-8 mt-16 h-auto w-auto p-4">{children}</main>
}
