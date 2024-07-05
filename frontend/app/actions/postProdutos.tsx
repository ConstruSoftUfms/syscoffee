"use server"

import { api } from "@/lib/axios"

export interface Produto {
    id: string
    nome: string
    marca: string
    valor: number
    descricao: string
    quantidade: number
    imagem_url: string
    categoria: {
        nome: string
    }
}

export interface PostProdutosResponse {
    produtos: Produto[]
}

export default async function postProdutos(produto: Omit<Produto, 'id'>) {
    const response = await api.post<PostProdutosResponse>('/produtos', produto)
    return response.data
}
