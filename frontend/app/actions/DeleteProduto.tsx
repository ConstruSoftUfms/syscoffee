'use server'

import { api } from '@/lib/axios';

export interface DelProduto {
  id: string;
}

export interface DeletePodutosResponse {
  success: boolean;
}

export default async function deleteProdutos(id: string) {
  const response = await api.delete<DeletePodutosResponse>(`/produtos/${id}`);
  return response.data;
}
