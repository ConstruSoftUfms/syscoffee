"""init

Revision ID: fbe1211e2b62
Revises:
Create Date: 2024-04-11 20:28:59.420116

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "fbe1211e2b62"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "categorias",
        sa.Column("nome", sa.String(), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "planos",
        sa.Column("nome", sa.String(), nullable=False),
        sa.Column("valor", sa.Float(), nullable=False),
        sa.Column("descricao", sa.String(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "produtos",
        sa.Column("nome", sa.String(), nullable=False),
        sa.Column("marca", sa.String(), nullable=False),
        sa.Column("valor", sa.Float(), nullable=False),
        sa.Column("descricao", sa.String(), nullable=False),
        sa.Column("quantidade", sa.Integer(), nullable=False),
        sa.Column("imagem_url", sa.String(), nullable=False),
        sa.Column("fk_categoria", sa.Uuid(), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["fk_categoria"],
            ["categorias.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.Column("nome", sa.String(), nullable=True),
        sa.Column("rg", sa.String(), nullable=True),
        sa.Column("cpf", sa.String(), nullable=True),
        sa.Column("telefone", sa.String(), nullable=True),
        sa.Column("nascimento", sa.DateTime(), nullable=True),
        sa.Column("endereco", sa.String(), nullable=True),
        sa.Column("foto", sa.String(), nullable=True),
        sa.Column("is_admin", sa.Boolean(), nullable=False),
        sa.Column("fk_plano", sa.Uuid(), nullable=True),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(
            ["fk_plano"],
            ["planos.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("users")
    op.drop_table("produtos")
    op.drop_table("planos")
    op.drop_table("categorias")
    # ### end Alembic commands ###