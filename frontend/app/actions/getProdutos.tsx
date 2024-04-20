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
        id: string
        nome: string
    }
}

export default async function getProdutos(): Promise<Produto[]> {
    try {
        const response = await api.get("/produtos")

        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
}