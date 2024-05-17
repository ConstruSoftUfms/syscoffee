from datetime import datetime
from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, HTTPException, UploadFile, status, Form
from pydantic import EmailStr
from sqlalchemy import or_, select
from src.db import SessionDependency
from src.models import User
from src.schemas import UserDetail, UserInput, UserList
from src.services.auth import get_password_hash

router = APIRouter(prefix="/users", tags=["Users"])


def save_file(file: UploadFile) -> str:
    # TODO: Implementar upload de arquivo
    return ""


@router.post(
    "",
    response_model=UserDetail,
    status_code=status.HTTP_201_CREATED,
)
async def create_user(
    username: Annotated[str, Form()],
    email: Annotated[EmailStr, Form()],
    password: Annotated[str, Form()],
    nome: Annotated[str, Form()],
    cpf: Annotated[str, Form()],
    telefone: Annotated[str, Form()],
    nascimento: Annotated[datetime, Form()],
    endereco_cep: Annotated[str, Form()],
    endereco_numero: Annotated[str, Form()],
    foto: UploadFile,
    session: SessionDependency,
):
    try:
        payload = UserInput(
            username=username,
            email=email,
            password=password,
            nome=nome,
            cpf=cpf,
            telefone=telefone,
            nascimento=nascimento,
            endereco_cep=endereco_cep,
            endereco_numero=endereco_numero,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    if session.scalar(
        select(User).where(
            or_(
                User.username == payload.username,
                User.email == payload.email,
            )
        )
    ):
        raise HTTPException(status_code=400, detail="Username ou email já cadastrados")

    try:
        foto_url = save_file(foto)
        # nome Foo Bar -> Foo+Bar
        foto_url = f"https://avatar.iran.liara.run/username?username={payload.nome.replace(' ', '+')}"
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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
        foto_url=foto_url,
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
