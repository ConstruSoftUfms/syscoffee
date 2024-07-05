

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddProduto() {
  async function handleCadastrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());
    console.log(body);

    toast.success(`Produto cadastrado com sucesso!`);

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
        <form onSubmit={handleCadastrar}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input id="nome" className="col-span-3" name="nome" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="descricao" className="text-right">
                Descrição
              </Label>
              <Input id="descricao" className="col-span-3" name="descricao" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="valor" className="text-right">
                Valor
              </Label>
              <Input id="valor" className="col-span-3" type="number" placeholder="R$" name="valor" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marca" className="text-right">
                Marca
              </Label>
              <Input id="marca" className="col-span-3" name="marca" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantidade" className="text-right">
                Quantidade
              </Label>
              <Input id="quantidade" className="col-span-3" type="number" name="quantidade" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoria" className="text-right">
                Categoria
              </Label>
              <Input id="categoria" className="col-span-3" name="categoria" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imagem_url" className="text-right text-xs">
                Imagem URL
              </Label>
              <Input id="imagem_url" className="col-span-3" name="imagem_url" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">
                Cadastrar
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}



