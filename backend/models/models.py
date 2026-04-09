from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    product_category = Column(String, nullable=False)
    design_stage = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    owner = relationship("User", back_populates="projects")
    stakeholder_analysis = relationship(
        "StakeholderAnalysis", back_populates="project", uselist=False, cascade="all, delete-orphan"
    )
    empathy_maps = relationship("EmpathyMap", back_populates="project", cascade="all, delete-orphan")
    critical_analysis = relationship(
        "CriticalAnalysis", back_populates="project", uselist=False, cascade="all, delete-orphan"
    )
    design_report = relationship(
        "DesignReport", back_populates="project", uselist=False, cascade="all, delete-orphan"
    )


class StakeholderAnalysis(Base):
    __tablename__ = "stakeholder_analyses"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    stakeholders_json = Column(Text, nullable=False)
    project = relationship("Project", back_populates="stakeholder_analysis")


class EmpathyMap(Base):
    __tablename__ = "empathy_maps"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    stakeholder_name = Column(String, nullable=False)
    empathy_data_json = Column(Text, nullable=False)
    project = relationship("Project", back_populates="empathy_maps")


class CriticalAnalysis(Base):
    __tablename__ = "critical_analyses"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    analysis_json = Column(Text, nullable=False)
    project = relationship("Project", back_populates="critical_analysis")


class DesignReport(Base):
    __tablename__ = "design_reports"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    report_json = Column(Text, nullable=False)
    project = relationship("Project", back_populates="design_report")
