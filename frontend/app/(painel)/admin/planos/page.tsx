'use client'

import getPlanos from "@/app/actions/getPlanos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";


export default function PlanosPage() {
  const { data: response } = useQuery({
    queryKey: ["planos"],
    queryFn: () => getPlanos(),
  });

  return (
    <div>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-8">
        Planos
      </h4>
      <Table className="min-w-full rounded-2xl">
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="text-center text-xs">Nome</TableHead>
            <TableHead className="text-center text-xs">Descrição</TableHead>
            <TableHead className="text-center text-xs">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response?.planos.map((planos, index) => (
            <TableRow key={index} className='border-neutral-700'>
              <TableCell className="text-left text-xs">{planos.nome}</TableCell>
              <TableCell>{planos.descricao}</TableCell>
              <TableCell className="text-center text-xs">R${planos.valor.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}