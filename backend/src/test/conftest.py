from hashlib import sha1

import mongomock
import pytest

from .. import main
from ..models import Note

FIRST_TEST_NOTE = {
    "_id": mongomock.ObjectId("67ebbe31e2a27ddd8b6b21ad"),
    "title": "Test Note",
    "content": "This is a test note.",
    "created_at": "2023-10-01 12:00:00",
    "updated_at": "2023-10-01 12:00:00",
    "items": [
        {
            "sha1": sha1(b"This is a test note.").hexdigest(),
            "content": "This is a test note.",
            "created_at": "2023-10-01 12:00:00",
        },
        {
            "sha1": sha1(b"This is a test note. Add new features").hexdigest(),
            "content": "This is a test note. Add new features",
            "created_at": "2023-10-01 12:00:00",
        },
    ],
}


@pytest.fixture
def mongo_mock(monkeypatch):
    client = mongomock.MongoClient()
    db = client.get_database("AlloBrain")
    col = db.get_collection("note")

    col.update_one(
        {
            "_id": FIRST_TEST_NOTE.get("_id", None),
        },
        {"$set": FIRST_TEST_NOTE},
        upsert=True,
    )

    def fake_db():
        return db

    monkeypatch.setattr(main, "get_db", fake_db)
    monkeypatch.setattr(Note, "get_db", fake_db)
