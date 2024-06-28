
'use client'

// Essa tela de produtos que exibe no painel do admin

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import getProdutos, { Produto } from '@/app/actions/getProdutos';
import deleteProdutos from '@/app/actions/DeleteProduto';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProdutosAdminPanel() {
  const queryClient = useQueryClient();
  const { data: response } = useQuery({
    queryKey: ['produtos'],
    queryFn: getProdutos,
  });

//   const mutation = useMutation({
//     mutationFn: deleteProdutos,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['produtos'] });
//     },
//   });

//   const handleDelete = (id: string) => {
//     mutation.mutate(id);
//   };



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
                <TableRow className="w-full bg-neutral-800">
                  <TableHead className="text-center text-sm">Nome</TableHead>
                  <TableHead className="text-center text-sm">Descrição</TableHead>
                  <TableHead className="text-center text-sm">Valor</TableHead>
                  <TableHead className="text-center text-sm">Marca</TableHead>
                  <TableHead className="text-center text-sm">Quantidade</TableHead>
                  <TableHead className="text-center text-sm">Categoria</TableHead>
                  {/* <TableHead className="text-center text-xs">Ações</TableHead> */}
                </TableRow>
                <TableBody>
                  {response?.produtos.map((produto, index) => (
                    <TableRow key={index} className='border-neutral-700'>
                      <TableCell className="text-left text-xs">{produto.nome}</TableCell>
                      <TableCell>{produto.descricao}</TableCell>
                      <TableCell className="text-center text-xs">R${produto.valor.toFixed(2)}</TableCell>
                      <TableCell className="text-center text-xs">{produto.marca}</TableCell>
                      <TableCell className="text-right text-xs">{produto.quantidade}</TableCell>
                      <TableCell className="text-center text-xs">{produto.categoria.nome}</TableCell>
                      <TableCell className="text-center text-xs">
                        {/* <Button
                          className="rounded-xl text-xs me-2 text-white border-none bg-zinc-600 hover:bg-zinc-500"
                        //   onClick={() => handleDelete(produto.id)}
                        >
                          Remover
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
