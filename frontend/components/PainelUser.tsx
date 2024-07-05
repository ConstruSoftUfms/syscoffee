
import ButtonSignOut from "@/components/auth/button-sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../app/api/auth/[...nextauth]/route";
import UsuariosPainel from "./UsuariosPainel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TableBody, TableCell, TableHead, TableRow } from './ui/table';
import PainelAdmbutton from "./PainelAdmin";

export default async function PainelUser() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user ?? { foto_url: "", username: "", nome: "", email: "", cpf: "", telefone: "", nascimento: "", endereco_cep: "", endereco_numero: "", is_admin: true};
  const isAdmin = user?.is_admin;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.foto_url} alt={user.username} />
          <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="mb-2">
          {isAdmin && (
            <>
              <PainelAdmbutton />
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem >
          <ButtonSignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
