import re
from typing import Optional

from pydantic import BaseModel, field_validator


class ContactRequest(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    budget: Optional[str] = None
    project_type: str
    message: str
    website: Optional[str] = None  # Honeypot

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2 or len(v) > 100:
            raise ValueError("Le nom doit contenir entre 2 et 100 caracteres.")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        if not re.match(pattern, v):
            raise ValueError("Adresse email invalide.")
        return v

    @field_validator("project_type")
    @classmethod
    def validate_project_type(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Le type de projet est requis.")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10 or len(v) > 5000:
            raise ValueError(
                "Le message doit contenir entre 10 et 5000 caracteres."
            )
        return v
