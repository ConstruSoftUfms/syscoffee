import pytest
from fastapi.testclient import TestClient
from sqlalchemy import StaticPool, create_engine
from sqlalchemy.orm import sessionmaker

from src.app import app
from src.db import get_session
from src.models import Base, User
from src.services.auth import get_password_hash


@pytest.fixture
def session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    yield Session()
    Base.metadata.drop_all(engine)


@pytest.fixture
def client(session):
    with TestClient(app) as client:
        app.dependency_overrides[get_session] = lambda: session
        yield client

    app.dependency_overrides.clear()


@pytest.fixture
def user_factory(session):
    password = "test"
    user = User(
        username="foo", email="test@email.com", password=get_password_hash(password)
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    user.clean_password = password
    return user
