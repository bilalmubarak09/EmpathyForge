from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class ProjectCreate(BaseModel):
    title: str
    description: str
    product_category: str
    design_stage: str


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    product_category: str
    design_stage: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ProjectDetailResponse(ProjectResponse):
    stakeholders: Optional[Any] = None
    empathy_maps: Optional[Any] = None
    critical_analysis: Optional[Any] = None
    design_report: Optional[Any] = None


class AnalysisResponse(BaseModel):
    project_id: int
    stakeholders: Any
    empathy_maps: Any
    critical_analysis: Any
    design_report: Any
