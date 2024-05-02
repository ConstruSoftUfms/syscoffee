"use server"

import { api } from "@/lib/axios"

export interface Plano {
    id: string;
    nome: string;
    valor: number;
    descricao: string;
}

export interface GetPlanosResponse {
    planos: Plano[]
}

export default async function getPlanos() {
    const response = await api.get<GetPlanosResponse>('/planos')
    return response.data
}