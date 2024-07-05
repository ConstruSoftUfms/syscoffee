'use server'

import { api } from "@/lib/axios"

export interface User {
    id: string
    token?: string
}

export interface deleteUserResponse {
    success: boolean;
}

export default async function deleteUser({ id, token }: User) {
    console.log(id, token);
    const response = await api.delete<deleteUserResponse>(`/users/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    return response.data
}
