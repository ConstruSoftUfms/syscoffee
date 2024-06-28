'use server'

import { api } from '@/lib/axios'


export interface User {
  username: string
  email: string
  password: string
  nome: string
  cpf: string
  telefone: string
  nascimento: string
  endereco_cep: string
  endereco_numero: string
}

export default async function postUser(data:User) {
  const response = await api.post<User>('/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
