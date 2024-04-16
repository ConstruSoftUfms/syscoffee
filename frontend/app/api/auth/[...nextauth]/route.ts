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

