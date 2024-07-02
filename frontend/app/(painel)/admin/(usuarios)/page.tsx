import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function UsersPage() {
  const session = await getServerSession(nextAuthOptions)
  const user = session?.user

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Perfil</h1>
      <span>
        Informações do usuário
      </span>
      <span>
        Nome: {user?.nome}
      </span>
      <span>
        Email: {user?.email}
      </span>
      <span>
        Username: {user?.username}
      </span>
      <span>
        ID: {user?.id}
      </span>
      <span>
        Nome: {user?.nome}
      </span>
      <span>
        CPF: {user?.cpf}
      </span>
      <span>
        Telefone: {user?.telefone}
      </span>
      <span>
        Nascimento: {user?.nascimento}
      </span>
      <span>
        CEP: {user?.endereco_cep}
      </span>
      <span>
        Número: {user?.endereco_numero}
      </span>
      <span>
        Admin: {user?.is_admin ? 'Sim' : 'Não'}
      </span>

    </div>
  );
}