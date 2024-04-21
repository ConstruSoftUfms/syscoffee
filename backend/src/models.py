from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, Uuid, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    id: Mapped[UUID] = mapped_column(
        Uuid(as_uuid=True), default=uuid4, primary_key=True
    )
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[None | datetime] = mapped_column(onupdate=func.now())


class User(Base):
    __tablename__ = "users"

    username: Mapped[str]
    email: Mapped[str]
    password: Mapped[str]

    nome: Mapped[str | None]
    cpf: Mapped[str | None]
    telefone: Mapped[str | None]
    nascimento: Mapped[datetime | None]
    foto_url: Mapped[str | None]

    endereco_cep: Mapped[str | None]
    endereco_numero: Mapped[str | None]

    is_admin: Mapped[bool] = mapped_column(default=False)

    fk_plano: Mapped[int | None] = mapped_column(ForeignKey("planos.id"))
    plano: Mapped["Plano"] = relationship("Plano", back_populates="usuarios")


class Categoria(Base):
    __tablename__ = "categorias"

    nome: Mapped[str]

    produtos: Mapped[list["Produto"]] = relationship(
        "Produto", back_populates="categoria"
    )


class Produto(Base):
    __tablename__ = "produtos"

    nome: Mapped[str]
    marca: Mapped[str]
    valor: Mapped[float]
    descricao: Mapped[str]
    quantidade: Mapped[int]
    imagem_url: Mapped[str]

    fk_categoria: Mapped[int] = mapped_column(ForeignKey("categorias.id"))
    categoria: Mapped[Categoria] = relationship("Categoria", back_populates="produtos")


class Plano(Base):
    __tablename__ = "planos"

    nome: Mapped[str]
    valor: Mapped[float]
    descricao: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=True)

    usuarios: Mapped[list[User]] = relationship("User", back_populates="plano")
