'use server'

import { api } from '@/lib/axios';

export interface DelProduto {
  id: string
  token?: string
}

export interface DeletePodutosResponse {
  success: boolean;
}

export default async function deleteProdutos({ id, token }: DelProduto) {
  console.log(id, token);
  const response = await api.delete<DeletePodutosResponse>(`/produtos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data;
}
