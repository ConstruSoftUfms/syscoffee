"use server"

import { api } from "@/lib/axios";

export interface Produto {
    nome: string;
    marca: string;
    valor: number;
    descricao: string;
    quantidade: number;
    imagem_url: string;
    categoria: string;
}

export interface PostProdutosResponse {
    success: boolean;
}

interface PostProdutosParams {
    produto: Produto;
    token?: string;
}

export default async function postProdutos({ produto, token }: PostProdutosParams) {
    const response = await api.post<PostProdutosResponse>(`/produtos`, produto, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
