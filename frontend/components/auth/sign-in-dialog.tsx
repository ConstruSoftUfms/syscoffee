"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Coffee } from "lucide-react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const loginSchema = z.object({
  username_email: z
    .string()
    .min(4, 'Mínimo 4 caracteres')
    .max(24, 'Máximo 24 caracteres'),
  password: z
    .string()
    .min(4, 'Mínimo 6 caracteres')
    .max(64, 'Máximo 64 caracteres'),
})

export function SignInDialog() {
  const searchParams = useSearchParams();
  const isOpen = searchParams.has("sign-in");
  const pathname = usePathname();
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username_email: '',
      password: '',
    },
  })

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        const user = { username: 'Sonner' };
        resolve(user);
      }, 2000)
    );

  const onOpenChange = (isOpen: boolean) => {
    const pathName = isOpen ? `${pathname}?sign-in` : pathname;
    router.push(pathName);
  };

  async function handleSignIn(data: z.infer<typeof loginSchema>) {
    await signIn('credentials', {
      username: data.username_email,
      password: data.password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        toast.warning('Credenciais inválidas')

        form.setError('username_email', {
          type: 'manual',
          message: 'Credenciais inválidas',
        })

        form.setError('password', {
          type: 'manual',
          message: 'Credenciais inválidas',
        })
      } else {
        toast.promise(promise,{
          loading: "Carregando...",
          success: "Bem vindo"
        });
        
        router.push('/')
        router.refresh()
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild id="login">
        <Button className="rounded-2xl text-1xl font-bold border-none bg-blue-600 hover:bg-blue-700 dark:text-white">Entrar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex-col items-center space-x-2">
          <DialogTitle>Entre na sua conta</DialogTitle>
          <Coffee className="mx-auto h-8 w-auto  text-zinc-700" />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="space-y-8"
          >
            <div className="grid gap-4 py-4 items-center">
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="username_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Username/Email" {...field} />
                      </FormControl>
                      <FormMessage className='text-yellow-300' />
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
                      <FormMessage className='text-yellow-300' />
                    </FormItem>
                  )}
                />
                <div className="items-top flex space-x-2">
                  <Checkbox id="remember_me" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="remember_me"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lembrar-me
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full" type="submit">
              Entrar
            </Button>
          </form>
        </Form>
        <div className="flex text-sm justify-between">
          {/* <Link href="?sign-in" className="font-medium text-zinc-900 hover:text-zinc-600">
            Esqueceu sua senha
          </Link> */}
          <Link href="?sign-up" className="dark:text-white font-medium text-zinc-900 hover:text-zinc-600">
            Cadastrar
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
