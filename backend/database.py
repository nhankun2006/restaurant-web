import os
from contextlib import asynccontextmanager
from typing import AsyncGenerator
import asyncpg
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("Missing DATABASE_URL in .env file")

pool: asyncpg.Pool | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global pool
    pool = await asyncpg.create_pool(dsn=DATABASE_URL, min_size=2, max_size=10)
    yield
    if pool:
        await pool.close()


async def get_db() -> AsyncGenerator[asyncpg.Connection, None]:
    if pool is None:
        raise RuntimeError("Database connection pool has not been initialized.")
    async with pool.acquire() as connection:
        yield connection
