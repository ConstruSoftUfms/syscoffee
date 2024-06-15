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
  foto: string
}

export default async function postUser(data:User) {
  const response = await api.post<User>('/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .catch ((error) => {
    console.error(error.response.data.detail[0].loc)
    return error.response
  })
    
  return response.data
}
