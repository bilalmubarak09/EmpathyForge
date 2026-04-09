import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.models import User, Project
from schemas.schemas import ProjectCreate, ProjectResponse, ProjectDetailResponse
from auth import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("/", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_project = Project(
        user_id=current_user.id,
        title=project.title,
        description=project.description,
        product_category=project.product_category,
        design_stage=project.design_stage,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


@router.get("/", response_model=List[ProjectResponse])
def list_projects(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return (
        db.query(Project)
        .filter(Project.user_id == current_user.id)
        .order_by(Project.created_at.desc())
        .all()
    )


@router.get("/{project_id}", response_model=ProjectDetailResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.user_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    result = ProjectDetailResponse(
        id=project.id,
        title=project.title,
        description=project.description,
        product_category=project.product_category,
        design_stage=project.design_stage,
        created_at=project.created_at,
        updated_at=project.updated_at,
    )

    if project.stakeholder_analysis:
        result.stakeholders = json.loads(project.stakeholder_analysis.stakeholders_json)
    if project.empathy_maps:
        result.empathy_maps = {
            em.stakeholder_name: json.loads(em.empathy_data_json) for em in project.empathy_maps
        }
    if project.critical_analysis:
        result.critical_analysis = json.loads(project.critical_analysis.analysis_json)
    if project.design_report:
        result.design_report = json.loads(project.design_report.report_json)

    return result


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.user_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}
