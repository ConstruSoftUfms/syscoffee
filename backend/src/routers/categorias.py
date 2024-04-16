from fastapi import APIRouter
from sqlalchemy import select

from src.db import SessionDependency
from src.models import Categoria

router = APIRouter(prefix="/categorias", tags=["Categorias"])


@router.get("")
async def list_categorias(session: SessionDependency):
    categorias = session.scalars(select(Categoria)).all()
    return {"categorias": categorias}
