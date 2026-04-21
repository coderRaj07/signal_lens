from fastapi import FastAPI
from app.api import competitors, checks, status
from app.models import Base
from app.db.database import engine
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
import time
from app.utils.logger import logger

app = FastAPI(title="Competitive Intelligence Tracker")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo (restrict later)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(competitors.router, prefix="/competitors")
app.include_router(checks.router, prefix="/checks")
app.include_router(status.router, prefix="/status")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info("Access Log", extra={"extra_info": {
        "method": request.method,
        "url": str(request.url),
        "status_code": response.status_code,
        "process_time": process_time
    }})
    return response

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Application starting up...", extra={"extra_info": {}})
