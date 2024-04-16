import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    username: string;
    email: string;
    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}