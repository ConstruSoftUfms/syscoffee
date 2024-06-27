'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

export const CheckoutPlano = ({ plano }: { plano: any }) => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const totalAmount = plano.valor;

  useEffect(() => {
    if (isDialogOpen && status === 'unauthenticated') {
        router.push('/?sign-in');
    }
  }, [isDialogOpen, status, router]);

  const handleDialogOpenChangePlano = (isOpen: any) => {
      if (isOpen && status === 'authenticated') {
          setIsDialogOpen(true);
      } else if (isOpen && status !== 'authenticated') {
          router.push('/?sign-in');
          toast.error('Realize o Login para assinar o plano!');
      } else {
          setIsDialogOpen(false);
      }
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          planId: plano.id,
          planName: plano.nome,
          planDescription: plano.descricao,
          planAmount: plano.valor,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao assinar o plano');
      }

      const data = await response.json();
      toast.success('Plano assinado com sucesso!');
      setPurchaseComplete(true);
      setIsDialogOpen(false);

      // Atualize os dados do usuário na sessão, se necessário
      // router.replace(router.asPath);
    } catch (error) {
      toast.error('Erro desconhecido não ta assinando o plano!');
    }
  };

  const userInfo = session?.user ? (
      <div></div>
  ) : null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChangePlano}>
      <DialogTrigger>
        <Button className="text-center bg-blue-700 text-white font-bold px-4 md:px-8 lg:px-24 py-2 rounded-2xl hover:bg-blue-950"
          style={{ display: "flex", margin: "0 auto", marginTop: '35px'}}>
          Assinar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-start text-xl'>Plano Escolhido</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Table className="min-w-full bg-[#2f2f2f] rounded-2xl">
            <TableHeader>
              <TableRow >
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-white">
                <TableCell>{plano.nome}</TableCell>
                <TableCell className="text-balance">{plano.descricao}</TableCell>
                <TableCell>R$ {plano.valor.toFixed(2)}/mês</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table  className="mt-6 min-w-full bg-[#2f2f2f] rounded-2xl">
                <TableRow>
                  <TableCell colSpan={3} className='text-white text-lg font-bold'>Total:</TableCell>
                  <TableCell className='text-right text-white text-lg font-bold'>R${totalAmount.toFixed(2)}</TableCell>
                </TableRow>
          </Table>
          <Button 
            type="submit" 
            className="mt-6 bg-green-700 text-white font-bold px-8 py-2 rounded-2xl hover:bg-green-900"
            onClick={handleSubscribe}
          >
            Assinar Plano
          </Button>

        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
