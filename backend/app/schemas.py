from pydantic import BaseModel
from typing import Optional
from datetime import date

class LeadBase(BaseModel):
    name: str
    contact: str
    company: str
    stage: str
    follow_up_date: Optional[date]

class LeadCreate(LeadBase): pass

class LeadOut(LeadBase):
    id: int
    class Config:
        orm_mode = True

class OrderBase(BaseModel):
    lead_id: int
    status: str
    dispatch_date: Optional[str]
    tracking_info: Optional[str]

class OrderCreate(OrderBase): pass

class OrderOut(OrderBase):
    id: int
    class Config:
        orm_mode = True
