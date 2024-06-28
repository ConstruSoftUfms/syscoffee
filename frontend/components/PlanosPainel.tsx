'use client'

// essa tela de planos que exibe no painel do admin

import { useQuery } from "@tanstack/react-query";
import { Table, TableHead, TableBody, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import getPlanos, { Plano } from "@/app/actions/getPlanos";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"; 
import { Button } from '@/components/ui/button';
import deleteProdutos,{ DelProduto } from "@/app/actions/DeleteProduto";

export default function PlanosAdminPanel() {
    const { 
        data: response 
      } = useQuery({
        queryKey: ["planos"],
        queryFn: () => getPlanos(),
      });
      

    const [selectedPlan, setSelectedPlan] = useState<Plano | null>(null);

  return (
    <div className="">
      
        {/* <CardContent className="text-right">
            <Button className="me-2 rounded-xl text-sm text-white font-bold border-none bg-zinc-600 hover:bg-zinc-500">
                Adicionar
            </Button>
        </CardContent> */}
        <div>
            <Card>
                <div>
                    <div className="flex-1 overflow-y-auto my-8">

                        <Table className="min-w-full rounded-2xl">
                           
                            <TableRow className="bg-neutral-800">
                                <TableHead className="text-center text-xs">Nome</TableHead>
                                <TableHead className="text-center text-xs">Descrição</TableHead>
                                <TableHead className="text-center text-xs">Valor</TableHead>
                                {/* <TableHead className="text-center text-xs">Ações</TableHead> */}
                            </TableRow>
                            <TableBody>
                            {response?.planos.map((planos, index) => (
                                <TableRow key={index} className='border-neutral-700'>
                                <TableCell className="text-left text-xs">{planos.nome}</TableCell>
                                <TableCell>{planos.descricao}</TableCell>
                                <TableCell className="text-center text-xs">R${planos.valor.toFixed(2)}</TableCell>
                                <TableCell className="text-center text-xs">
                                    {/* <Button className="rounded-xl text-xs me-2 text-white border-none bg-zinc-600 hover:bg-zinc-500">
                                        Editar
                                    </Button> */}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
            
                        </Table>
                    </div>
                </div>
            </Card>

        </div>

    </div>
  );
}

