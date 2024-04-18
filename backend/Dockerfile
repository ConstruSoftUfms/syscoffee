FROM python:3.11-slim

WORKDIR /app

ENV POETRY_VIRTUALENVS_CREATE=false
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

COPY ./pyproject.toml .

RUN pip3 install poetry
RUN poetry config installer.max-workers 10
RUN poetry install --without dev

COPY ./src src
COPY ./config.py .
COPY ./alembic.ini .

CMD ["poetry", "run", "uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "8000"]