'use server'

import { api } from '@/lib/axios'

export interface User {
  id: string
  nome: string
}

export default async function postUser(data) {
  const response = await api.post<User>('/users', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
