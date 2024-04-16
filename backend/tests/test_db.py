from sqlalchemy import select

from src.models import User


def test_create_user(session):
    new_user = User(username="foo", password="secret", email="teste@test")
    session.add(new_user)
    session.commit()

    user = session.scalar(select(User).where(User.username == "foo"))

    assert user.username == "foo"
    assert user.email == "teste@test"
    assert user.password == "secret"
