
// essa tela exibe os dados do usuário logado no painel do admin

import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../app/api/auth/[...nextauth]/route';
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { Table, TableBody, TableCell, TableHead, TableRow } from './ui/table';




export default async function UserPainel() {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user;

    if (!user) {
        return (
            <Card>
                <CardContent>
                    <CardTitle>Usuário não está logado.</CardTitle>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex-1 overflow-y-auto my-8">
                <Card>
                    <TableRow className="bg-neutral-800">
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Nascimento</TableHead>
                        <TableHead>Endereço</TableHead>
                        <TableHead>Número</TableHead>
                        {/* <TableHead>Ações</TableHead> */}

                    </TableRow>
                    <TableBody>
                        <TableRow className="mt-6 text-white text-sm border-neutral-700">
                            <TableCell>{user.nome}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.cpf}</TableCell>
                            <TableCell>{user.telefone}</TableCell>
                            <TableCell>{user.nascimento}</TableCell>
                            <TableCell>{user.endereco_cep}</TableCell>
                            <TableCell>{user.endereco_numero}</TableCell>
                            {/* <TableCell className="text-center text-xs">
                                    <Button className="rounded-xl text-xs me-2 text-white border-none bg-zinc-600 hover:bg-zinc-500">
                                        editar
                                    </Button>
                            </TableCell> */}

                        </TableRow>
                        {/* <CardContent className="text-right">
                            <Button className="rounded-xl text-1xl text-white font-bold border-none bg-zinc-600 hover:bg-zinc-500">
                                Editar
                            </Button>

                        </CardContent> */}


                    </TableBody>

                    <CardContent className='text-right'>

                    </CardContent>
                        
                </Card>
            </div>
        </div>

    );
}
