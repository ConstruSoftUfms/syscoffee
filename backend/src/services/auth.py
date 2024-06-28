from datetime import datetime, timedelta
from typing import Annotated
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt import ExpiredSignatureError, PyJWTError, encode, decode
from pwdlib import PasswordHash
from pydantic import BaseModel

from config import Config
from src.db import SessionDependency
from src.models import User

pwd_context = PasswordHash.recommended()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


class TokenData(BaseModel):
    uid: UUID | str
    sub: str
    exp: datetime
    iat: datetime


def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: SessionDependency,
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token expired",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)
    except ExpiredSignatureError as e:
        raise expired_exception from e
    except PyJWTError as e:
        raise credentials_exception from e

    try:
        token_data = TokenData(
            uid=UUID(payload.get("uid")),
            sub=payload.get("sub"),
            exp=payload.get("exp"),
            iat=payload.get("iat"),
        )
    except Exception as e:
        raise credentials_exception from e

    if not (user := session.get(User, token_data.uid)):
        raise credentials_exception

    return user


def encode_token(user_id: str, username: str):
    to_encode = TokenData(
        uid=user_id,
        sub=username,
        iat=datetime.utcnow(),
        exp=datetime.utcnow() + timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return encode(to_encode.model_dump(), Config.SECRET_KEY, algorithm=Config.ALGORITHM)


def decode_token(token: str) -> dict:
    return decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])


def get_password_hash(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)
