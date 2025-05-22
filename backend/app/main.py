from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
import models, schemas, crud

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/leads/")
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    return crud.create_lead(db, lead)

@app.get("/leads/")
def read_leads(db: Session = Depends(get_db)):
    return crud.get_leads(db)

@app.put("/leads/{lead_id}/stage/")
def update_stage(lead_id: int, stage: str, db: Session = Depends(get_db)):
    return crud.update_lead_stage(db, lead_id, stage)

@app.post("/orders/")
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db, order)

@app.get("/orders/")
def read_orders(db: Session = Depends(get_db)):
    return crud.get_orders(db)
