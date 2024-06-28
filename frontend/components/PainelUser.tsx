
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import ButtonSignOut from "@/components/auth/button-sign-out";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { getServerSession } from "next-auth";
  import { nextAuthOptions } from "../app/api/auth/[...nextauth]/route";
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog";
  import UserPainel from "./UserPainel";
  import { Button } from "@/components/ui/button";
  import ProdutosAdminPanel from "./ProdutoPainel";
  import PlanosAdminPanel from "./PlanosPainel";
  import { Card } from "./ui/card";
  import { Accordion, AccordionContent, AccordionTrigger, AccordionItem} from "./ui/accordion";
  import UsuariosPainel from "./UsuariosPainel";
  import { Table, TableBody, TableCell, TableHead, TableRow } from './ui/table';
  
  export default async function PainelUser() {
    const session = await getServerSession(nextAuthOptions);
    const user = session?.user ?? { foto_url: "", username: "", nome: "", email: "", cpf: "", telefone: "", nascimento: "", endereco_cep: "", endereco_numero: ""};
    const isAdmin = user.username === "admin";
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.foto_url} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div>
            <Card>
              <Dialog>
                <DialogTrigger className="mt-6 w-full">
                  <Button className="mb-6 w-full rounded-xl text-1xl text-white font-bold border-none bg-zinc-600 hover:bg-zinc-500">
                    Painel
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-screen-lg h-[80vh] overflow-y-auto p-4 flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-center mb-8">Painel usuário</DialogTitle>
                    <div className="flex-1">
                      <Card>    
                        <Accordion type="single" collapsible className="">
                            <AccordionItem value="item-1">
                            <AccordionTrigger className="mx-8" >Meu perfil</AccordionTrigger>
                                <AccordionContent>
                                  <TableRow className="bg-neutral-800">
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Username</TableHead>
                                    <TableHead>CPF</TableHead>
                                    <TableHead>Telefone</TableHead>
                                    <TableHead>Nascimento</TableHead>
                                    <TableHead>Endereço</TableHead>
                                    <TableHead>Número</TableHead>
                                    {/* <TableHead>Ações</TableHead> */}

                                  </TableRow>
                                  <TableBody>
                                        <TableRow className="mt-6 text-white text-sm border-neutral-700">
                                            <TableCell>{user.nome}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.cpf}</TableCell>
                                            <TableCell>{user.telefone}</TableCell>
                                            <TableCell>{user.nascimento}</TableCell>
                                            <TableCell>{user.endereco_cep}</TableCell>
                                            <TableCell>{user.endereco_numero}</TableCell>
                                        </TableRow>
                                  </TableBody>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion  >
                        {isAdmin && (
                          <>
                                <Accordion type="single" collapsible className="">
                                    <AccordionItem value="item-1">
                                    <AccordionTrigger className="mx-8">Produtos cadastrados</AccordionTrigger>
                                        <AccordionContent>
                                            <ProdutosAdminPanel/>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                    <AccordionTrigger className="mx-8">Planos cadastrados</AccordionTrigger>
                                        <AccordionContent>
                                            <PlanosAdminPanel />
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                    <AccordionTrigger className="mx-8">Usuários cadastrados</AccordionTrigger>
                                        <AccordionContent>
                                            <UsuariosPainel />
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion  >
                          </>
                        )}
                      </Card>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </Card>
          </div>
  
          <DropdownMenuItem>
            <ButtonSignOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  