'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Coffee } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const signUpSchema = z.object({
  username: z
    .string()
    .min(6, 'Username deve ter no mínimo 6 caracteres')
    .max(50, 'Username deve ter no máximo 50 caracteres'),
  email: z
    .string()
    .email('Email inválido')
    .max(50, 'Email deve ter no máximo 50 caracteres'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .max(50, 'Senha deve ter no máximo 50 caracteres'),
})

export function SignUpDialog() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("sign-up");
  const pathname = usePathname();
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const onOpenChange = (isOpen: boolean) => {
    const pathName = isOpen ? `${pathname}?sign-up` : pathname;
    router.push(pathName);
  };

  async function handleSignUp(data: z.infer<typeof signUpSchema>) {
    const username = data.username
    const email = data.email
    const password = data.password

    const response = await api.post('/users', { username, email, password })

    if (response.status === 201) {
      alert('Usuário criado com sucesso!')
      router.replace('/?sign-in')
    } else {
      alert('Erro ao criar usuário!')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild id="login">
        <Button className="rounded-2xl text-1xl font-bold border-none bg-green-800 hover:bg-green-900 ">Cadastre-se</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex-col items-center space-x-2">
          <DialogTitle>Cadastre-se</DialogTitle>
          <Coffee className="mx-auto h-8 w-auto  text-zinc-700" />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-8"
          >
            <div className="grid gap-4 py-4 items-center">
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" placeholder="Senha" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button className="w-full" type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
        <div className="flex text-sm justify-end">
          <Link href="?sign-in" className="font-medium text-zinc-900 hover:text-zinc-600">
            Já tenho uma conta
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
