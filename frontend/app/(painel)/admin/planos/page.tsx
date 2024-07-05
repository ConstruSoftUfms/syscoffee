'use client'

import getPlanos from "@/app/actions/getPlanos";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Download } from "lucide-react";
import autoTable from 'jspdf-autotable'


export default function PlanosPage() {
  const { data: response } = useQuery({
    queryKey: ["planos"],
    queryFn: () => getPlanos(),
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Planos", 14, 22);

    const tableColumn = ["Nome", "Descrição", "Valor"];
    const tableRows: string[][] = [];

    response?.planos.forEach(planos => {
      const planosData = [
        planos.nome,
        planos.descricao,
        `R$${planos.valor.toFixed(2)}`,
      ];
      tableRows.push(planosData);
    });

    autoTable(doc,{
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("relatorio_planos.pdf");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Planos
        </h4>
        <Button onClick={generatePDF} variant="outline" className="ml-4">
          <Download className="w-4 h-4 mr-2" />
          Baixar Relatório
        </Button>
      </div>

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
