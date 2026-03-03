import os
from datetime import datetime, timezone

from fastapi import APIRouter, Request
from schemas.contact import ContactRequest

router = APIRouter(tags=["contact"])


@router.post("/contact")
async def submit_contact(data: ContactRequest, request: Request):
    if data.website:
        return {"success": True, "message": "Message envoye avec succes."}

    db = request.app.state.db

    doc = {
        "name": data.name.strip(),
        "email": data.email.strip().lower(),
        "company": data.company.strip() if data.company else None,
        "budget": data.budget.strip() if data.budget else None,
        "project_type": data.project_type.strip(),
        "message": data.message.strip(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    result = await db.contact_requests.insert_one(doc)

    smtp_host = os.environ.get("SMTP_HOST", "")
    if smtp_host:
        try:
            import aiosmtplib
            from email.message import EmailMessage

            msg = EmailMessage()
            msg["Subject"] = f"Nouveau contact: {doc['name']} - {doc['project_type']}"
            msg["From"] = os.environ.get("SMTP_FROM", "")
            msg["To"] = os.environ.get("SMTP_TO", "")
            body = (
                f"Nom: {doc['name']}\n"
                f"Email: {doc['email']}\n"
                f"Entreprise: {doc.get('company', 'N/A')}\n"
                f"Budget: {doc.get('budget', 'N/A')}\n"
                f"Type: {doc['project_type']}\n\n"
                f"Message:\n{doc['message']}"
            )
            msg.set_content(body)
            await aiosmtplib.send(
                msg,
                hostname=smtp_host,
                port=int(os.environ.get("SMTP_PORT", "587")),
                username=os.environ.get("SMTP_USER", ""),
                password=os.environ.get("SMTP_PASSWORD", ""),
                use_tls=True,
            )
        except Exception:
            pass

    return {"success": True, "message": "Message envoye avec succes."}
