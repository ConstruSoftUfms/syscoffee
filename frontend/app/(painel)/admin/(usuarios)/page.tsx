'use client'


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import getUser from "@/app/actions/getUser";
import { Car, Trash2 } from "lucide-react";
import deleteUser from "@/app/actions/DeleteUser";
import { toast } from "sonner";
import { queryClient } from "@/lib/tanstack";
import { useSession } from "next-auth/react";
import {Card} from "@/components/ui/card";

export default function UsersPage() {
    const { data: session } = useSession();

    const { data: response } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUser(),
    });

    const mutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
          toast.success('Usuario deletado com sucesso!');
          queryClient.invalidateQueries({ queryKey: ['users'] });
        }
    });

    const handleDelete = (id: string) => {
        mutation.mutate({ id, token: session?.accessToken });
    };

    const sortedUsers = response?.users.sort((a, b) => {
        if (a.email === session?.user?.email) return -1;
        if (b.email === session?.user?.email) return 1;
        return 0;
    });

    

    return (
        
            <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-8">
                    Usuarios
                </h4>
                <div >
                    <div className="flex">
                        <Table className="min-w-full rounded-2xl">
                            <TableHeader>
                                <TableRow className="bg-neutral-800">
                                    <TableHead>Nome</TableHead>
                                    <TableHead>UserName</TableHead>
                                    <TableHead>CPF</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead />   
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedUsers?.map((user, index) => (
                                    <TableRow key={index} className="border-neutral-700">
                                        <TableCell className="font-medium">{user.nome}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.cpf}</TableCell>
                                        <TableCell className="text-center">{user.email}</TableCell>
                                        <TableCell className="text-right text-xs">
                                            {session?.user?.cpf !== user.cpf && (
                                                <Button onClick={() => handleDelete(user.id)} variant="destructive">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        
    
    );
}
