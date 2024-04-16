def test_deve_criar_um_usuario(client):
    response = client.post(
        "/users",
        json={
            "username": "foo",
            "email": "test@test.com",
            "password": "secret",
        },
    )

    assert response.status_code == 201
    assert response.json()["id"] is not None
    assert response.json()["username"] == "foo"
    assert response.json()["email"] == "test@test.com"


def test_deve_listar_nenhum_usuario(client):
    response = client.get("/users")

    assert response.status_code == 200
    assert response.json() == {"users": []}


def test_deve_listar_usuarios(client, user_factory):
    response = client.get(f"/users/{user_factory.id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": str(user_factory.id),
        "username": user_factory.username,
        "email": user_factory.email,
    }


def test_deve_atualizar_usuario(client, user_factory):
    response = client.put(
        f"/users/{user_factory.id}",
        json={
            "username": "Updated",
            "email": "email@updated.com",
            "password": "new_secret",
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": str(user_factory.id),
        "username": "Updated",
        "email": "email@updated.com",
    }


def test_delete_user(client, user_factory):
    response = client.delete(f"/users/{user_factory.id}")
    assert response.status_code == 204


def test_login(client, user_factory):
    response = client.post(
        "/login",
        data={"username": user_factory.username, "password": "secret"},
    )
    assert response.status_code == 200
    assert response.json()["access_token"] is not None
    assert response.json()["token_type"] == "bearer"


def test_login_com_usuario_inexistente(client):
    response = client.post(
        "/login",
        data={"username": "foo", "password": "bar"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect username"}


def test_login_com_senha_incorreta(client, user_factory):
    response = client.post(
        "/login",
        data={"username": user_factory.username, "password": "bar"},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Incorrect password"}
