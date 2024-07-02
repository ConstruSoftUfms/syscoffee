'use client'

import deleteProdutos from "@/app/actions/DeleteProduto";
import getProdutos from "@/app/actions/getProdutos";
import { AddProduto } from "@/components/AddProduto";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/tanstack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


export default function ProdutosPage() {
  const { data: session } = useSession();
  const { data: response } = useQuery({
    queryKey: ['produtos'],
    queryFn: () => getProdutos(),
  });

  const mutation = useMutation({
    mutationFn: deleteProdutos,
    onSuccess: () => {
      toast.success('Produto deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
    }
  });

  const handleDelete = (id: string) => {
    mutation.mutate({ id, token: session?.accessToken });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Produtos
        </h4>
        <AddProduto />
      </div>

      <Table className="min-w-full rounded-2xl">
        <TableHeader>
          <TableRow className="w-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700">
            <TableHead className="text-left text-sm">Nome</TableHead>
            <TableHead className="text-left text-sm">Descrição</TableHead>
            <TableHead className="text-center text-sm">Valor</TableHead>
            <TableHead className="text-center text-sm">Marca</TableHead>
            <TableHead className="text-center text-sm">Quantidade</TableHead>
            <TableHead className="text-center text-sm">Categoria</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {response?.produtos.map((produto, index) => (
            <TableRow key={index} className='border-neutral-700'>
              <TableCell className="text-left text-xs">{produto.nome}</TableCell>
              <TableCell>{produto.descricao}</TableCell>
              <TableCell className="text-center text-xs">R${produto.valor.toFixed(2)}</TableCell>
              <TableCell className="text-center text-xs">{produto.marca}</TableCell>
              <TableCell className="text-center text-xs">{produto.quantidade}</TableCell>
              <TableCell className="text-center text-xs">{produto.categoria.nome}</TableCell>
              <TableCell className="text-right text-xs">
                <Button onClick={() => handleDelete(produto.id)} variant={'destructive'}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}