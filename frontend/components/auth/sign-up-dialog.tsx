'use client'

import postUser from '@/app/actions/postUser'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Coffee } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

export const signUpSchema = z.object({
  username: z.string()
  .min(4, { message:"Username deve ter no mínimo 6 caracteres"})
  .max(50, { message: "Username deve ter no máximo 50 caracteres"}),
  email: z.string().email('Email inválido')
  .max(50, 'Email deve ter no máximo 50 caracteres'),
  password: z.string()
  .min(4, 'Senha deve ter no mínimo 4 caracteres')
  .max(50, 'Senha deve ter no máximo 50 caracteres'),
  nome: z.string()
  .min(6, 'Nome deve ter no mínimo 6 caracteres')
  .max(50, 'Nome deve ter no máximo 50 caracteres'),
  cpf: z.string()
  .min(11, 'CPF deve ter no mínimo 11 caracteres')
  .max(14, 'CPF deve ter no máximo 14 caracteres'),
  telefone: z.string()
  .min(9, 'Telefone deve ter no mínimo 10 caracteres')
  .max(15, 'Telefone deve ter no máximo 15 caracteres'),
  nascimento: z.string()
  .min(8, 'Data de nascimento deve ter no mínimo 8 caracteres')
  .max(10, 'Data de nascimento deve ter no máximo 10 caracteres'),
  endereco_cep: z.string()
  .min(8, 'CEP deve ter no mínimo 8 caracteres')
  .max(11, 'CEP deve ter no máximo 9 caracteres'),
  endereco_numero: z.string()
  .min(1, 'Número deve ter no mínimo 1 caracteres')
  .max(6, 'Número deve ter no máximo 6 caracteres'),
  foto: z.string(),
})

export function SignUpDialog() {
  const searchParams = useSearchParams()
  const isOpen = searchParams.has('sign-up')
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      nome: '',
      cpf: '',
      telefone: '',
      nascimento: '',
      endereco_cep: '',
      endereco_numero: '',
      foto: '',
    },
  })

  const onOpenChange = (isOpen: boolean) => {
    const pathName = isOpen ? `${pathname}?sign-up` : pathname
    router.push(pathName)
  }

  async function handleSignUp(data: z.infer<typeof signUpSchema>) {
    await postUser(data)
      .then((response) => {
        if (response.status === 201) {
          toast.success('Usuário criado com sucesso!')
          router.replace('/?sign-in')
        } else {
          toast.error('Erro ao criar usuário')
          

        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild id="login">
        <Button className="text-1xl rounded-2xl border-none bg-green-800 font-bold hover:bg-green-900 dark:text-white">
          Cadastre-se
        </Button>
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
            <div className="grid items-center gap-4 py-4">
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="CPF" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid h-auto grid-cols-2 place-content-center gap-2">
                  <FormField
                    control={form.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Telefone" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nascimento"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Data de Nascimento"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="CEP" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endereco_numero"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Número" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
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
                  name="foto"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="file"  placeholder="foto" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="grid h-auto grid-cols-2 place-content-center gap-2">
                
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Cadastrar
            </Button>
          </form>
        </Form>
        <div className="flex justify-end text-sm">
          <Link
            href="?sign-in"
            className="font-medium text-zinc-900 hover:text-zinc-600"
          >
            Já tenho uma conta
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
