

import postProdutos from "@/app/actions/postProdutos";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { queryClient } from "@/lib/tanstack";
import { useMutation } from "@tanstack/react-query";
import { PlusCircle } from 'lucide-react';
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddProduto() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: postProdutos,
    onSuccess: () => {
      toast.success('Produto cadastrado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['produtos'] });
    }
  });

  const handlePostProduto = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = event.currentTarget.id.valueOf();
    mutation.mutate({
      token: session?.accessToken, 
      produto: {
        nome: event.currentTarget.nome.value,
        marca: event.currentTarget.marca.value,
        valor: parseFloat(event.currentTarget.valor.value),
        descricao: event.currentTarget.descricao.value,
        quantidade: parseInt(event.currentTarget.quantidade.value),
        imagem_url: event.currentTarget.imagem_url.value,
        categoria: event.currentTarget.categoria.value
      }
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Adicionar
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Novo Produto</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <form onSubmit={handlePostProduto}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input id="nome" className="col-span-3" name="nome" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Input id="descricao" className="col-span-3" name="descricao" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input id="valor" className="col-span-3" type="number" step="0.01" placeholder="R$" name="valor" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marca" className="text-right">
                Marca
              </Label>
              <Input id="marca" className="col-span-3" name="marca" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input id="quantidade" className="col-span-3" type="number" name="quantidade" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              <Input id="categoria" className="col-span-3" name="categoria" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imagem_url" className="text-right text-xs">
                Imagem URL
              </Label>
              <Input id="imagem_url" className="col-span-3" name="imagem_url" required />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" >
                Cadastrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}



