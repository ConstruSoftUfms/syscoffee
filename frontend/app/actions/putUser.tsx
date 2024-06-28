import { api } from '@/lib/axios'


export interface User {
  id: string
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

export interface PutUserResponse {
  users: User[]
}

export default async function putUser() {
  const response = await api.put<PutUserResponse>('/users')
  return response.data
}


