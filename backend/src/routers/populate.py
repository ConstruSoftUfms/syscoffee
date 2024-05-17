from datetime import datetime

from fastapi import APIRouter

from src.db import SessionDependency
from src.models import Categoria, Plano, Produto, User
from src.services.auth import get_password_hash

router = APIRouter(prefix="/pop", tags=["Populate"])


@router.get("")
async def populate_db(session: SessionDependency):
    admin = User(
        username="admin",
        email="admin@email.com",
        password=get_password_hash("admin"),

        nome="Admin Edminson",
        cpf="12345678900",
        telefone="123456789",
        nascimento=datetime(1990, 1, 1),
        endereco_cep="12345678",
        endereco_numero="123",
        foto_url="https://avatar.iran.liara.run/username?username=Admin+Edminson",

        is_admin=True,
    )

    users = [
        User(
            username="user1",
            email="user1@email.com",
            password=get_password_hash("user1"),
            nome="User Userson",
            cpf="98765432100",
            telefone="987654321",
            nascimento=datetime(1990, 1, 1),
            endereco_cep="87654321",
            endereco_numero="987",
            foto_url="https://avatar.iran.liara.run/username?username=User+Userson",
        ),
        User(
            username="user2",
            email="user2@email.com",
            password=get_password_hash("user2"),
            nome="User Digerson",
            cpf="98765432100",
            telefone="987654321",
            nascimento=datetime(1990, 1, 1),
            endereco_cep="87654321",
            endereco_numero="987",
            foto_url="https://avatar.iran.liara.run/username?username=User+Digerson",
        ),
        User(
            username="user3",
            email="user3@email.com",
            password=get_password_hash("user3"),
            nome="User Treson",
            cpf="98765432100",
            telefone="987654321",
            nascimento=datetime(1990, 1, 1),
            endereco_cep="87654321",
            endereco_numero="987",
            foto_url="https://avatar.iran.liara.run/username?username=User+Treson",
        ),
    ]

    planos = [
        Plano(
            nome="Free",
            valor=0,
            descricao="Plano gratuito. Apenas da acesso a compras na plataforma sem beneficios adicionais.",
        ),
        Plano(
            nome="Basic",
            valor=100.0,
            descricao="Plano com acesso a compras, descontos e beneficios exclusivos.",
        ),
        Plano(
            nome="Premium",
            valor=200.0,
            descricao="Plano com acesso a compras, descontos e beneficios exclusivos. Além de produtos gratuitos.",
        ),
    ]

    bebidas = Categoria(
        nome="Bebidas",
    )
    embalagens = Categoria(
        nome="Embalagens",
    )

    produtos = [
        Produto(
            nome="Café expresso simples",
            marca="Café gourmet",
            valor=5.0,
            descricao="Café expresso simples",
            quantidade=100,
            categoria=bebidas,
            imagem_url="https://media.istockphoto.com/id/537409510/pt/foto/m%C3%A1quina-de-caf%C3%A9-puxando-uma-fotografia.jpg?s=612x612&w=0&k=20&c=aBDL4vwyMPCvbTZGB8R19wB1GmwcXCNoISBSwiFUByc=",
        ),
        Produto(
            nome="Café expresso duplo",
            marca="Café gourmet",
            valor=7.0,
            descricao="Café expresso duplo",
            quantidade=100,
            categoria=bebidas,
            imagem_url="https://media.istockphoto.com/id/1432861372/pt/foto/coffee-extraction-from-the-coffee-machine-with-a-portafilter-pouring-coffee-into-a-cup.jpg?s=612x612&w=0&k=20&c=Qv4XvFBJyi7rv9RSMJS1qPPUoBrK4uCspdAn1U0MlBY=",
        ),
        Produto(
            nome="Capuccino",
            marca="Café gourmet",
            valor=10.0,
            descricao="Capuccino",
            quantidade=100,
            categoria=bebidas,
            imagem_url="https://media.istockphoto.com/id/523168994/pt/foto/capuccino-com-gr%C3%A3os-de-caf%C3%A9.jpg?s=612x612&w=0&k=20&c=9AKVQ2eLtKetoza_DzDbEDX6LikQlFLx7bsVfWDg5hI=",
        ),
        Produto(
            nome="Latte",
            marca="Café gourmet",
            valor=15.0,
            descricao="Latte",
            quantidade=100,
            categoria=bebidas,
            imagem_url="https://media.istockphoto.com/id/1045880988/pt/foto/coffee-art-in-cup-closeup-of-hands-making-latte-art.jpg?s=612x612&w=0&k=20&c=PzlffOKynXxv36oRGNYFDYyhDkCLG1dRS5ZzwaKF704=",
        ),
        Produto(
            nome="Pacote moído",
            marca="Café gourmet",
            valor=40.0,
            descricao="Pacote de café gourmet",
            quantidade=100,
            categoria=embalagens,
            imagem_url="https://media.istockphoto.com/id/962658860/pt/foto/coffee-bag-with-custom-label-organic-whole-beans.jpg?s=612x612&w=0&k=20&c=hX3rRavuuh6KWA0si7hdVdjHobQi30A3FXVtFaE_13M=",
        ),
        Produto(
            nome="Pacote grãos",
            marca="Café gourmet",
            valor=50.0,
            descricao="Pacote de café gourmet",
            quantidade=100,
            categoria=embalagens,
            imagem_url="https://media.istockphoto.com/id/1188065848/pt/foto/blank-brown-kraft-paper-pouch-bag-with-coffee-beans-in-transparent-window-on-wooden-background.jpg?s=612x612&w=0&k=20&c=Kc6PA9kTShpfODepDd36cHuZs27eqTYIC5Fu35DKvgs=",
        ),
    ]

    session.add(admin)
    session.add_all(users)
    session.add_all(planos)
    session.add_all([bebidas, embalagens])
    session.add_all(produtos)
    session.commit()

    return {"message": "Database populated."}
