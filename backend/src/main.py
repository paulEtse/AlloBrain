import logging
from datetime import datetime

from bson import ObjectId
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .config import get_db
from .models.Note import Note
from .models.schemas import AddNote, NotesResponseModel, UpdateNote

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (change this for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    logging.info("Hello World")
    return {"message": "Hello World"}


@app.get("/note", response_model=NotesResponseModel)
async def get_note(limit: int = 9, page: int = 1):
    """
    Get a list of notes from the database.
    """
    logging.info("Get note")
    db = get_db()
    response = list(
        db.note.aggregate(
            [
                {
                    "$sort": {
                        "updated_at": -1,
                    }
                },
                {
                    "$facet": {
                        "notes": [
                            {"$skip": (limit * (page - 1))},
                            {"$limit": limit},
                        ],
                        "count": [
                            {"$count": "total"},
                        ],
                    }
                },
            ]
        )
    )
    if not response or len(response[0]["count"]) == 0:
        return {
            "notes": [],
            "total": 0,
        }
    return {
        "notes": response[0]["notes"],
        "total": response[0]["count"][0]["total"],
    }


@app.post("/note", response_model=Note)
async def create_note(new_note: AddNote):
    """
    Create a new note in the database.
    """
    logging.info("Create note")
    note = Note(
        title=new_note.title,
    )
    note.add_item(content=new_note.content)
    return note.save()


@app.get("/note/search/{title}", response_model=NotesResponseModel)
async def search_note(title: str, limit: int = 9, page: int = 1):
    """
    Search for notes by title.
    """
    logging.info("Search note")
    db = get_db()
    response = list(
        db.note.aggregate(
            [
                {"$match": {"title": {"$regex": title, "$options": "i"}}},
                {
                    "$sort": {
                        "updated_at": -1,
                    }
                },
                {
                    "$facet": {
                        "notes": [
                            {"$skip": (limit * (page - 1))},
                            {"$limit": limit},
                        ],
                        "count": [
                            {"$count": "total"},
                        ],
                    }
                },
            ]
        )
    )
    if not response or len(response[0]["count"]) == 0:
        return {
            "notes": [],
            "total": 0,
        }
    return {
        "notes": response[0]["notes"],
        "total": response[0]["count"][0]["total"],
    }


@app.get("/note/{id}", response_model=Note)
async def get_note_by_id(id: str):
    """
    Get a note by its ID.
    """
    logging.info("Get note by ID")
    db = get_db()
    note = db.note.find_one({"_id": ObjectId(id)})
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return Note(**note)


@app.patch("/note/{id}", response_model=Note)
async def update_note(id: str, update_note: UpdateNote):
    """
    Update a note by its ID.
    """
    logging.info("Update note")
    db = get_db()
    note = db.note.find_one({"_id": ObjectId(id)})
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    note = Note(**note)
    note.add_item(content=update_note.content)
    return note.save()


@app.delete("/note/{id}")
async def delete_note(id: str):
    """
    Delete a note by its ID.
    """
    logging.info("Delete note")
    db = get_db()
    note = db.note.find_one({"_id": ObjectId(id)})
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    db["noteDeleted"].insert_one(
        {
            **note,
            "deleted_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
    )
    db.note.delete_one({"_id": ObjectId(id)})
    return {"message": "Note deleted successfully"}


@app.post("/note/{id}/{sha1}", response_model=Note)
async def gotback_to_sha1(id: str, sha1: str):
    """
    Go back to a specific SHA1 of a note.
    """
    logging.info("Go back to SHA1")
    db = get_db()
    note = db.note.find_one({"_id": ObjectId(id)})
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    note = Note(**note)
    try:
        note.gotback_to_sha1(sha1)
    except Exception:
        raise HTTPException(status_code=404, detail="SHA1 not found in note items")
    note.gotback_to_sha1(sha1)
    return note.save()
