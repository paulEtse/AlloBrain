import hashlib
from datetime import datetime
from typing import Annotated, Optional

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, Field

from ..config import get_db

from .NoteEntry import NoteEntry

PyObjectId = Annotated[str, BeforeValidator(str)]


class Note(BaseModel):
    """
    Represents a note in the system.
    """

    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(..., description="Title of the note")
    items: list[NoteEntry] = Field(
        default_factory=list,
        description="List of items in the note",
    )
    created_at: datetime = Field(
        default_factory=datetime.now, description="Creation date of the note"
    )
    updated_at: datetime = Field(
        default_factory=datetime.now, description="Last update date of the note"
    )

    class ModelConfig:
        """
        Configuration for the Note model.
        """

        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: lambda v: str(v),
            datetime: lambda v: v.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def add_item(self, content: str):
        """
        Add an item to the note.
        """
        note_entry = NoteEntry(
            content=content, sha1=hashlib.sha1(content.encode()).hexdigest()
        )
        self.items.append(note_entry)
        self.updated_at = datetime.now()

    def gotback_to_sha1(self, sha1: str):
        """
        Get back to a specific SHA1 version of the note.
        """

        """
        Find noteEntry with the given SHA1 in the note items.
        remove all noteEntry with the after SHA1
        """
        for index, item in enumerate(self.items):
            if item.sha1 == sha1:
                self.items = self.items[: index + 1]
                self.updated_at = datetime.now()
                return
        raise Exception("SHA1 not found in note items")

    def save(self):
        """
        Save the note to the database.
        """
        db = get_db()

        result = db.note.update_one(
            {"_id": ObjectId(self.id)},
            {
                "$set": {
                    "title": self.title,
                    "items": [item.model_dump() for item in self.items],
                    "updated_at": self.updated_at,
                    "created_at": self.created_at,
                }
            },
            upsert=True,
        )
        if result.upserted_id or result.modified_count > 0:
            self.id = str(result.upserted_id if result.upserted_id else self.id)
            return self
