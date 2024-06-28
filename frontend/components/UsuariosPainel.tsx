
"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';
import getUser, { User } from '@/app/actions/getUser';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function UsuariosPainel() {
    const { 
        data: response
    } = useQuery({
        queryKey: ["users"],
        queryFn:() => getUser(),
    });

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-neutral-800">
                                <TableHead>Nome</TableHead>
                                <TableHead>UserName</TableHead>
                                <TableHead >CPF</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {response?.users.map((user, index) => (
                                <TableRow key={index} className='border-neutral-700'>
                                    <TableCell className="font-medium">{user.nome}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.cpf}</TableCell>
                                    <TableCell className="text-center">{user.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

