import json
import re
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
genai.configure(api_key=GEMINI_API_KEY)


def _parse_json_response(text: str) -> dict | list:
    """Strip markdown code fences and parse JSON."""
    text = text.strip()
    text = re.sub(r'^```(?:json)?\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    text = text.strip()
    return json.loads(text)


def _get_model():
    return genai.GenerativeModel("gemini-1.5-pro")


def identify_stakeholders(project_description: str, product_category: str, design_stage: str) -> list:
    model = _get_model()
    prompt = f"""You are an expert Industrial Design strategist. Given the following project description, identify ALL relevant stakeholders (minimum 5, maximum 10).

Project Description: {project_description}
Product Category: {product_category}
Design Stage: {design_stage}

For each stakeholder provide: name, role, why_they_matter, relevance_score (1-10). Consider users, manufacturers, retailers, environment, community, government, etc.

Return ONLY valid JSON array with no additional text or explanation."""

    try:
        response = model.generate_content(prompt)
        return _parse_json_response(response.text)
    except Exception as e:
        raise RuntimeError(f"Failed to identify stakeholders: {str(e)}") from e


def generate_empathy_map(project_description: str, stakeholder_name: str, stakeholder_role: str) -> dict:
    model = _get_model()
    prompt = f"""You are an empathy mapping expert trained in Human-Centered Design.

For the stakeholder '{stakeholder_name}' (role: {stakeholder_role}) related to this project: {project_description}

Generate a detailed empathy map. Return ONLY valid JSON with keys: think_and_believe, feel, say_and_do, pain_points, gains, influence_on_design. Each value should be an array of 3-5 strings. No additional text."""

    try:
        response = model.generate_content(prompt)
        return _parse_json_response(response.text)
    except Exception as e:
        raise RuntimeError(f"Failed to generate empathy map for {stakeholder_name}: {str(e)}") from e


def generate_critical_analysis(project_description: str, stakeholders_summary: str) -> dict:
    model = _get_model()
    prompt = f"""You are playing 7 critical reviewer roles for this design project.

Project: {project_description}
Key Stakeholders: {stakeholders_summary}

For each role give a concise, honest, critical response (3-5 sentences).
Roles: skeptic, investor, environmentalist, manufacturer, end_user, ethicist, local_context_analyst (focus on Pakistan/South Asia).

Return ONLY valid JSON object with each role as a key and the response as the value. No additional text."""

    try:
        response = model.generate_content(prompt)
        return _parse_json_response(response.text)
    except Exception as e:
        raise RuntimeError(f"Failed to generate critical analysis: {str(e)}") from e


def generate_design_report(
    project_description: str, stakeholders_summary: str, critical_analysis_summary: str
) -> dict:
    model = _get_model()
    prompt = f"""Based on this industrial design project and its analysis, generate a Design Intelligence Report.

Project: {project_description}
Stakeholders Summary: {stakeholders_summary}
Critical Analysis Summary: {critical_analysis_summary}

Return ONLY valid JSON with keys: refined_problem_statement (string), design_opportunities (array of 3 objects with title and description), risks_and_challenges (array of 3 objects with title and description), recommended_next_steps (array of 5 strings), key_stakeholder_priorities (array of ranked strings), ethical_considerations (array of strings), sustainability_notes (array of strings). No additional text."""

    try:
        response = model.generate_content(prompt)
        return _parse_json_response(response.text)
    except Exception as e:
        raise RuntimeError(f"Failed to generate design report: {str(e)}") from e
