import json
from services.ai_service import (
    identify_stakeholders,
    generate_empathy_map,
    generate_critical_analysis,
    generate_design_report,
)


def run_full_analysis(project_description: str, product_category: str, design_stage: str) -> dict:
    """Run the complete AI analysis pipeline."""

    # Step 1: Identify stakeholders
    stakeholders = identify_stakeholders(project_description, product_category, design_stage)

    # Step 2: Generate empathy maps for each stakeholder
    empathy_maps = {}
    for stakeholder in stakeholders:
        name = stakeholder.get("name", "Unknown")
        role = stakeholder.get("role", "")
        empathy_map = generate_empathy_map(project_description, name, role)
        empathy_maps[name] = empathy_map

    # Step 3: Run critical analysis
    stakeholders_summary = ", ".join([f"{s['name']} ({s['role']})" for s in stakeholders])
    critical_analysis = generate_critical_analysis(project_description, stakeholders_summary)

    # Step 4: Generate design report
    critical_summary = json.dumps(critical_analysis)[:500]
    design_report = generate_design_report(project_description, stakeholders_summary, critical_summary)

    return {
        "stakeholders": stakeholders,
        "empathy_maps": empathy_maps,
        "critical_analysis": critical_analysis,
        "design_report": design_report,
    }
