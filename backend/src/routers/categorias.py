from uuid import UUID

from fastapi import APIRouter
from sqlalchemy import select

from src.db import SessionDependency
from src.models import Categoria
from src.schemas import BaseSchema

router = APIRouter(prefix="/categorias", tags=["Categorias"])


class CategoriaDetail(BaseSchema):
    id: UUID
    nome: str


@router.get("")
async def list_categorias(session: SessionDependency):
    categorias = session.scalars(select(Categoria)).all()
    return {"categorias": categorias}
