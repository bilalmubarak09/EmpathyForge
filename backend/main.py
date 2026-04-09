from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import models
from routers import auth_router, project, empathy

app = FastAPI(title="EmpathyForge API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(project.router)
app.include_router(empathy.router)


@app.on_event("startup")
def startup_event():
    models.Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "EmpathyForge API is running", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy"}
