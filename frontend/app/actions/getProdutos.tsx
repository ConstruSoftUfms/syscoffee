"use server"

import { api } from "@/lib/axios"

export  interface Produto {
    id: string
    nome: string
    marca: string
    valor: number
    descricao: string
    quantidade: number
    imagem_url: string
    categoria: {
        id: string
        nome: string
    }
}

export interface GetPodutosResponse {
    produtos: Produto[]
}

export default async function getProdutos() {
    const response = await api.get<GetPodutosResponse>('/produtos')
    return response.data
}