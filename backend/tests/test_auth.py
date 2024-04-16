# from freezegun import freeze_time
from src.services.auth import encode_token


def test_login_com_username(client, user_factory):
    response = client.post(
        "/auth/login",
        data={
            "username": user_factory.username,
            "password": user_factory.clean_password,
        },
    )
    token = response.json()

    assert response.status_code == 200
    assert "access_token" in token
    assert "token_type" in token


def test_login_com_email(client, user_factory):
    response = client.post(
        "/auth/login",
        data={"username": user_factory.email, "password": user_factory.clean_password},
    )
    token = response.json()

    assert response.status_code == 200
    assert "access_token" in token
    assert "token_type" in token


def test_token_inexistent_user(client):
    response = client.post(
        "/auth/login",
        data={"username": "no_user@no_domain.com", "password": "test"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Credenciais inválidas"}


def test_token_wrong_password(client, user_factory):
    response = client.post(
        "/auth/login",
        data={"username": user_factory.email, "password": "wrong_password"},
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Credenciais inválidas"}


# def test_token_expiry(client, user):
#     with freeze_time('2023-07-14 12:00:00'):
#         response = client.post(
#             '/auth/token',
#             data={'username': user.email, 'password': user.clean_password},
#         )
#         assert response.status_code == 200
#         token = response.json()['access_token']
#
#     with freeze_time('2023-07-14 13:00:00'):
#         response = client.post(
#             '/auth/refresh_token',
#             headers={'Authorization': f'Bearer {token}'},
#         )
#         assert response.status_code == 401
#         assert response.json() == {'detail': 'Could not validate credentials'}


def test_me(client, user_factory):
    token = encode_token(user_factory.id, user_factory.username)
    response = client.get(
        "/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    me = response.json()

    assert response.status_code == 200
    assert me["user"]["id"] == str(user_factory.id)
    assert me["user"]["username"] == user_factory.username
    assert me["user"]["email"] == user_factory.email
