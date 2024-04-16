from fastapi import APIRouter
from sqlalchemy import select

from src.db import SessionDependency
from src.models import Plano
from src.schemas import PlanoList

router = APIRouter(prefix="/planos", tags=["Planos"])


@router.get("", response_model=PlanoList)
async def list_planos(session: SessionDependency):
    planos = session.scalars(select(Plano)).all()
    return PlanoList(planos=planos)
