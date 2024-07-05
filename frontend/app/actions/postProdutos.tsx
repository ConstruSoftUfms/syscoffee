"use server"

import { api } from "@/lib/axios";

export interface Produto {
    id: string;
    nome: string;
    marca: string;
    valor: number;
    descricao: string;
    quantidade: number;
    imagem_url: string;
    categoria: {
        nome: string;
    };
}

export interface PostProdutosResponse {
    success: boolean;
}

interface PostProdutosParams {
    produto: Produto;
    token: string;
}

export default async function postProdutos({ produto, token }: PostProdutosParams) {
    console.log(produto.id, token);
    const response = await api.post<PostProdutosResponse>(`/produtos/${produto.id}`, produto, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
