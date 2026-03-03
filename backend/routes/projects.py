from fastapi import APIRouter, HTTPException, Request

router = APIRouter(tags=["projects"])


@router.get("/projects")
async def get_projects(request: Request):
    projects = request.app.state.projects
    summaries = []
    for p in projects:
        summaries.append(
            {
                "id": p["id"],
                "title": p["title"],
                "shortDescription": p["shortDescription"],
                "stack": p["stack"],
                "status": p["status"],
                "type": p["type"],
                "isAcademic": p.get("isAcademic", False),
                "date": p["date"],
                "links": p.get("links", {}),
                "image": p.get("image", ""),
            }
        )
    return summaries


@router.get("/projects/{project_id}")
async def get_project(project_id: str, request: Request):
    projects = request.app.state.projects
    for p in projects:
        if p["id"] == project_id:
            return p
    raise HTTPException(status_code=404, detail="Projet introuvable")
