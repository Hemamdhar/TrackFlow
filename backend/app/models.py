from sqlalchemy import Column, Integer, String, Date, ForeignKey
from .database import Base

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    contact = Column(String)
    company = Column(String)
    stage = Column(String)
    follow_up_date = Column(Date)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"))
    status = Column(String)
    dispatch_date = Column(String)
    tracking_info = Column(String)
