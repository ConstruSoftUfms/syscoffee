import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    username: string;
    email: string;

    nome: string;
    cpf: string;
    telefone: string;
    nascimento: string;
    endereco_cep: string;
    endereco_numero: string;
    foto_url: string;

    is_admin: boolean;

    accessToken: string;
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}