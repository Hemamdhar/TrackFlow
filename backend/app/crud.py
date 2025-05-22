from sqlalchemy.orm import Session
import models, schemas

def create_lead(db: Session, lead: schemas.LeadCreate):
    db_lead = models.Lead(**lead.dict())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead

def get_leads(db: Session):
    return db.query(models.Lead).all()

def update_lead_stage(db: Session, lead_id: int, stage: str):
    lead = db.query(models.Lead).get(lead_id)
    lead.stage = stage
    db.commit()
    return lead

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(**order.dict())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def get_orders(db: Session):
    return db.query(models.Order).all()
