from pydantic import BaseModel

class IdeaInput(BaseModel):
    idea: str
    target_users: str | None = None
    revenue_model: str | None = None
    problem_statement: str | None = None