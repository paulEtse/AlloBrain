from datetime import datetime

from pydantic import BaseModel, Field


class NoteEntry(BaseModel):
    """
    Represents a note entry in the system.
    """

    sha1: str
    content: str
    created_at: datetime = Field(
        default_factory=datetime.now, description="Creation date of the note"
    )

    class ModelConfig:
        json_encoders = {
            datetime: lambda v: v.strftime("%Y-%m-%d %H:%M:%S"),
        }
