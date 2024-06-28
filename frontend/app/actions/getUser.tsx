'use server'

import { api } from "@/lib/axios"

export interface User {
    id: string
    username: string;
    email: string;
    nome: string;
    cpf: string;
}

export interface GetUserResponse {
    users: User[]
}

export default async function getUser() {
    const response = await api.get<GetUserResponse>('/users')
    return response.data
}


