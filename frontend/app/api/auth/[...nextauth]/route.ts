import { api } from '@/lib/axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

const signInResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    email: z.string(),

    nome: z.string(),
    cpf: z.string(),
    telefone: z.string(),
    nascimento: z.string(),
    endereco_cep: z.string(),
    endereco_numero: z.string(),
    foto_url: z.string(),

    is_admin: z.boolean(),
  }),
})

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await api
          .post('/auth/login', new URLSearchParams(credentials), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
          .catch((error) => {
            console.error(
              'API Error',
              error.response.status,
              error.response.data,
            )
            throw error
          })
        const data = signInResponseSchema.parse(response?.data)
        return {
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,

          nome: data.user.nome,
          cpf: data.user.cpf,
          telefone: data.user.telefone,
          nascimento: data.user.nascimento,
          endereco_cep: data.user.endereco_cep,
          endereco_numero: data.user.endereco_numero,
          foto_url: data.user.foto_url,

          is_admin: data.user.is_admin,

          accessToken: data.access_token,
        }
      },
    }),
  ],
  pages: {
    signIn: '/?sign-in',
    newUser: '/?sign-up',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (
        token.accessToken = user.accessToken,
        token.user = {
          id: user.id,
          username: user.username,
          email: user.email,
          nome: user.nome,
          cpf: user.cpf,
          telefone: user.telefone,
          nascimento: user.nascimento,
          endereco_cep: user.endereco_cep,
          endereco_numero: user.endereco_numero,
          foto_url: user.foto_url,
          is_admin: user.is_admin,
        }
      )
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      session.accessToken = token.accessToken as any
      return session
    }
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }

