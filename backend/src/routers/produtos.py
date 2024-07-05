from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from src.db import SessionDependency
from src.models import Produto, User, Categoria
from src.schemas import ProdutoCreate, ProdutoList
from src.services.auth import get_current_user

router = APIRouter(prefix="/produtos", tags=["Produtos"])


@router.get("", response_model=ProdutoList)
async def list_produtos(session: SessionDependency):
    produtos = session.scalars(select(Produto)).all()
    return ProdutoList(produtos=produtos)


@router.get("/{produto_id}")
async def detail_produto(produto_id: UUID, session: SessionDependency):
    if not (produto := session.scalar(select(Produto).where(Produto.id == produto_id))):
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    return produto


@router.post("")
async def create_produto(
    user: Annotated[User, Depends(get_current_user)],
    payload: ProdutoCreate,
    session: SessionDependency,
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Acesso negado")

    categoria = session.scalar(select(Categoria).where(Categoria.nome.ilike(payload.categoria)))

    if not categoria:
        categoria = Categoria(nome=payload.categoria)
        session.add(categoria)

    produto = Produto(
        nome=payload.nome,
        marca=payload.marca,
        valor=payload.valor,
        descricao=payload.descricao,
        quantidade=payload.quantidade,
        imagem_url=payload.imagem_url,
        categoria=categoria,
    )

    session.add(produto)
    session.commit()
    session.refresh(produto)

    return produto


@router.put("/{produto_id}")
async def update_produto(
    user: Annotated[User, Depends(get_current_user)],
    produto_id: UUID,
    payload,
    session: SessionDependency,
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Acesso negado")

    if not (produto := session.scalar(select(Produto).where(Produto.id == produto_id))):
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    produto.nome = payload.nome
    produto.marca = payload.marca
    produto.valor = payload.valor
    produto.descricao = payload.descricao
    produto.quantidade = payload.quantidade
    produto.imagem_url = payload.imagem_url
    produto.fk_categoria = payload.categoria_id

    session.commit()
    session.refresh(produto)

    return produto


@router.delete("/{produto_id}")
async def delete_produto(
    user: Annotated[User, Depends(get_current_user)],
    produto_id: UUID,
    session: SessionDependency,
):
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Acesso negado")

    if not (produto := session.scalar(select(Produto).where(Produto.id == produto_id))):
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    session.delete(produto)
    session.commit()

    return produto
