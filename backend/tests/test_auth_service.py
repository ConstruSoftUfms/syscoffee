from datetime import datetime, timedelta

import pytest
from jose import jwt

from config import Config
from src.services import auth


def test_deve_gerar_e_decodificar_token():
    token = auth.encode_token("1", "test")
    decoded_token = auth.decode_token(token)

    assert decoded_token["uid"] == "1"
    assert decoded_token["sub"] == "test"
    assert decoded_token["exp"] is not None
    assert decoded_token["iat"] is not None


def test_deve_gerar_e_verificar_hash_da_senha():
    hashed_password = auth.get_password_hash("test")

    assert hashed_password is not None
    assert hashed_password != "test"

    assert auth.verify_password("test", hashed_password)
    assert not auth.verify_password("foo", hashed_password)


def test_get_current_user(session, user_factory):
    token = auth.encode_token(user_factory.id, user_factory.username)

    current_user = auth.get_current_user(session, token)

    assert current_user == user_factory


def test_nao_deve_autenticar_usuario_com_token_invalido(session, user_factory):
    with pytest.raises(auth.HTTPException) as e:
        auth.get_current_user(session, "invalid_token")

    assert e.value.status_code == 401
    assert e.value.detail == "Invalid authentication credentials"

    with pytest.raises(auth.HTTPException) as e:
        auth.get_current_user(session, "Bearer invalid_token")

    assert e.value.status_code == 401
    assert e.value.detail == "Invalid authentication credentials"


def test_nao_deve_autenticar_usuario_com_token_expirado(session, user_factory):
    token = auth.encode_token(user_factory.id, user_factory.username)
    expired_token = jwt.encode(
        {
            **jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM]),
            "exp": datetime.utcnow() - timedelta(minutes=1),
        },
        Config.SECRET_KEY,
        algorithm=Config.ALGORITHM,
    )

    with pytest.raises(auth.HTTPException) as e:
        auth.get_current_user(session, expired_token)

    assert e.value.status_code == 401
    assert e.value.detail == "Token expired"
