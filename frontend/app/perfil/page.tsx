import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";


export default async function PerfilPage() {
  const session = await getServerSession(nextAuthOptions)
  const user = session?.user

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Perfil</h1>
      <span>
        Informações do usuário
      </span>
      <span>
        Nome: {user?.name}
      </span>
      <span>
        Email: {user?.email}
      </span>
      <span>
        Username: {user?.username}
      </span>
    </div>
  );
}