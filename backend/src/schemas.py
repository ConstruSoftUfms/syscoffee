from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True, coerce_numbers_to_str=True, populate_by_name=True
    )


class UserInput(BaseSchema):
    username: str
    email: EmailStr
    password: str


class UserDetail(BaseSchema):
    id: UUID
    username: str
    email: EmailStr


class UserList(BaseSchema):
    users: list[UserDetail]


class CategoriaDetail(BaseSchema):
    id: UUID
    nome: str


class ProdutoDetail(BaseSchema):
    id: UUID
    nome: str
    marca: str
    valor: float
    descricao: str
    quantidade: int
    imagem_url: str
    categoria: CategoriaDetail


class ProdutoList(BaseSchema):
    produtos: list[ProdutoDetail]


class PlanoDetail(BaseSchema):
    id: UUID
    nome: str
    valor: float
    descricao: str


class PlanoList(BaseSchema):
    planos: list[PlanoDetail]
