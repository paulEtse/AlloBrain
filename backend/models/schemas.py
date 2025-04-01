from pydantic import BaseModel, Field


class AddNote(BaseModel):
    title: str = Field(..., description="Title of the note")
    content: str = Field(..., description="Content of the note")


class UpdateNote(BaseModel):
    content: str = Field(..., description="Content of the note")
