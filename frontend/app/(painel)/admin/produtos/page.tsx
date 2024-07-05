'use client'

import { useEffect, useRef } from "react";
import deleteProdutos from "@/app/actions/DeleteProduto";
import getProdutos from "@/app/actions/getProdutos";
import { AddProduto } from "@/components/AddProduto";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { queryClient } from "@/lib/tanstack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Trash2, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'



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

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Produtos", 14, 22);

    const tableColumn = ["Nome", "Descrição", "Valor", "Marca", "Quantidade", "Categoria"];
    const tableRows: (string | number)[][] = [];

    response?.produtos.forEach(produto => {
      const produtoData = [
        produto.nome,
        produto.descricao,
        `R$${produto.valor.toFixed(2)}`,
        produto.marca,
        produto.quantidade,
        produto.categoria.nome,
      ];
      tableRows.push(produtoData);
    });

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("relatorio_produtos.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Produtos
        </h4>
        <div>
          <Button onClick={generatePDF} variant="outline" className="mr-4">
            <Download className="w-4 h-4 mr-2" />
            Baixar Relatório
          </Button>
          <AddProduto />

        </div>
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
