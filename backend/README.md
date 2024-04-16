# MyCoffe API

## Visão Geral do Sistema

Bem-vindo à documentação da API MyCoffe! Esta API alimenta a aplicação MyCoffe, uma plataforma de assinatura de café que oferece aos clientes acesso a uma variedade de planos de café. Este README fornece informações sobre como configurar e usar a API localmente, além de orientações sobre como executar os testes.

### Tecnologias Principais Utilizadas

- [FastAPI](https://fastapi.tiangolo.com/): Framework web rápido para Python.
- [SQLAlchemy](https://www.sqlalchemy.org/): Toolkit SQL em Python.
- [Alembic](https://alembic.sqlalchemy.org/en/latest/): Framework para migrações de banco de dados.
- [Poetry](https://python-poetry.org/): Gerenciador de dependências e empacotamento de projetos Python.

### Ferramentas de Desenvolvimento
- [Pytest](https://docs.pytest.org/en/latest/): Framework de teste para Python.
- [Ruff](https://docs.astral.sh/ruff/): Ferramenta de análise estática de código.
- [Isort](https://pycqa.github.io/isort/): Ferramenta para ordenar importações Python.

### Pré-requisitos

- Docker

## Rodando a API Localmente

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/ConstruSoftUfms/backend
    ```

2. **Acesse o diretório do projeto:**

    ```bash
    cd backend
    ```

3. **Execute o projeto:**

    ```bash
    docker-compose build
    ```
    ```bash
    docker-compose up -d
    ```
    ```bash
    docker exec api poetry run alembic upgrade head
    ```

Agora, a API MyCoffee estará sendo executada localmente em http://localhost:8000.

## Executando Testes

 ```bash
 pytest
 ```

Certifique-se de que todos os testes passaram antes de prosseguir com a implementação ou deploy.

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
