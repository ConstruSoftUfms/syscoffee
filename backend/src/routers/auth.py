from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import or_, select

from src.db import SessionDependency
from src.models import User
from src.schemas import UserDetail
from src.services.auth import encode_token, get_current_user, verify_password

router = APIRouter(prefix="/auth", tags=["Auth"])


class Token(BaseModel):
    access_token: str
    token_type: str


class LoginResponse(Token):
    user: UserDetail


@router.post("/login", response_model=LoginResponse)
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDependency,
):
    """
    Username ou email podem ser usados para logar
    """
    if not (
        user := session.scalar(
            select(User).where(
                or_(
                    User.username == form_data.username,
                    User.email == form_data.username,
                )
            )
        )
    ):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    access_token = encode_token(str(user.id), form_data.username)

    return LoginResponse(access_token=access_token, token_type="bearer", user=user)


class MeResponse(BaseModel):
    user: UserDetail


@router.get("/me", response_model=MeResponse)
async def me(user: Annotated[User, Depends(get_current_user)]):
    return MeResponse(user=user)
