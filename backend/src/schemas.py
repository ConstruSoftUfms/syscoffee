from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True, coerce_numbers_to_str=True, populate_by_name=True
    )


class UserBase(BaseSchema):
    username: str
    email: EmailStr
    nome: str
    cpf: str
    telefone: str
    nascimento: datetime
    endereco_cep: str
    endereco_numero: str


class UserInput(UserBase):
    password: str


class UserListItem(BaseSchema):
    id: UUID
    username: str
    email: EmailStr
    nome: str
    cpf: str


class UserList(BaseSchema):
    users: list[UserListItem]


class CategoriaDetail(BaseSchema):
    id: UUID
    nome: str


class ProdutoBase(BaseSchema):
    nome: str
    marca: str
    valor: float
    descricao: str
    quantidade: int
    imagem_url: str


class ProdutoCreate(ProdutoBase):
    pass
    categoria_id: UUID | None = None


class ProdutoDetail(ProdutoBase):
    id: UUID
    categoria: CategoriaDetail


class ProdutoList(BaseSchema):
    produtos: list[ProdutoDetail]


class PlanoDetail(BaseSchema):
    id: UUID
    nome: str
    valor: float
    descricao: str


class UserDetail(UserBase):
    id: UUID
    is_admin: bool
    foto_url: str
    plano: PlanoDetail | None


class PlanoList(BaseSchema):
    planos: list[PlanoDetail]
