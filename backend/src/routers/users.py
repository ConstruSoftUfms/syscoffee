from uuid import UUID

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import or_, select

from src.db import SessionDependency
from src.models import User
from src.schemas import UserInput, UserList, UserDetail
from src.services.auth import get_password_hash

router = APIRouter(prefix="/users", tags=["Users"])


@router.post(
    "",
    response_model=UserDetail,
    status_code=status.HTTP_201_CREATED,
)
async def create_user(payload: UserInput, session: SessionDependency):
    if session.scalar(
        select(User).where(
            or_(
                User.username == payload.username,
                User.email == payload.email,
            )
        )
    ):
        raise HTTPException(status_code=400, detail="Username ou email já cadastrados")

    user = User(
        username=payload.username,
        email=payload.email,
        password=get_password_hash(payload.password),
        nome=payload.nome,
        cpf=payload.cpf,
        telefone=payload.telefone,
        nascimento=payload.nascimento,
        endereco_cep=payload.endereco_cep,
        endereco_numero=payload.endereco_numero,
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.get("", response_model=UserList)
async def list_users(session: SessionDependency):
    users = session.scalars(select(User)).all()
    return {"users": users}


@router.get("/{user_id}", response_model=UserDetail)
async def detail_user(user_id: UUID, session: SessionDependency):
    if not (user := session.scalar(select(User).where(User.id == user_id))):
        raise HTTPException(status_code=404, detail="Usuario não encontrado")

    return user


@router.put("/users/{user_id}", response_model=UserDetail)
async def update_user(user_id: UUID, payload: UserInput, session: SessionDependency):
    if not (user := session.scalar(select(User).where(User.id == user_id))):
        raise HTTPException(status_code=404, detail="Usuario não encontrado")

    user.password = get_password_hash(payload.password)
    user.username = payload.username
    user.email = payload.email

    session.commit()
    session.refresh(user)

    return user


@router.delete("/{user_id}", status_code=204)
async def delete_user(user_id: UUID, session: SessionDependency):
    if not (user := session.scalar(select(User).where(User.id == user_id))):
        raise HTTPException(status_code=404, detail="Usuario não encontrado")

    session.delete(user)
    session.commit()
