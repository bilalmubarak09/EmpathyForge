import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.models import User, Project, StakeholderAnalysis, EmpathyMap, CriticalAnalysis, DesignReport
from schemas.schemas import AnalysisResponse
from auth import get_current_user
from services.stakeholder_service import run_full_analysis

router = APIRouter(prefix="/empathy", tags=["empathy"])


@router.post("/analyze/{project_id}", response_model=AnalysisResponse)
def analyze_project(
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

    try:
        results = run_full_analysis(project.description, project.product_category, project.design_stage)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")

    # Save stakeholder analysis
    existing_sa = db.query(StakeholderAnalysis).filter(StakeholderAnalysis.project_id == project_id).first()
    if existing_sa:
        existing_sa.stakeholders_json = json.dumps(results["stakeholders"])
    else:
        db.add(StakeholderAnalysis(project_id=project_id, stakeholders_json=json.dumps(results["stakeholders"])))

    # Save empathy maps (replace existing)
    db.query(EmpathyMap).filter(EmpathyMap.project_id == project_id).delete()
    for name, data in results["empathy_maps"].items():
        db.add(EmpathyMap(project_id=project_id, stakeholder_name=name, empathy_data_json=json.dumps(data)))

    # Save critical analysis
    existing_ca = db.query(CriticalAnalysis).filter(CriticalAnalysis.project_id == project_id).first()
    if existing_ca:
        existing_ca.analysis_json = json.dumps(results["critical_analysis"])
    else:
        db.add(CriticalAnalysis(project_id=project_id, analysis_json=json.dumps(results["critical_analysis"])))

    # Save design report
    existing_dr = db.query(DesignReport).filter(DesignReport.project_id == project_id).first()
    if existing_dr:
        existing_dr.report_json = json.dumps(results["design_report"])
    else:
        db.add(DesignReport(project_id=project_id, report_json=json.dumps(results["design_report"])))

    db.commit()

    return AnalysisResponse(
        project_id=project_id,
        stakeholders=results["stakeholders"],
        empathy_maps=results["empathy_maps"],
        critical_analysis=results["critical_analysis"],
        design_report=results["design_report"],
    )
