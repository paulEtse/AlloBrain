
from fastapi.testclient import TestClient

import hashlib

from src.test.conftest import FIRST_TEST_NOTE
from .. import main
client = TestClient(main.app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["message"] == "Hello World"


def test_getnotes(mongo_mock):
    response = client.get("/note")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    notes = response.json()
    assert len(notes) == 1
    assert notes[0]["_id"] == FIRST_TEST_NOTE["_id"].__str__()
    assert notes[0]["title"] == FIRST_TEST_NOTE["title"]


def test_get_note_by_id(mongo_mock):
    response = client.get("/note/67ebbe31e2a27ddd8b6b21ad")
    assert response.status_code == 200
    assert response.json()["title"] == FIRST_TEST_NOTE["title"]
    assert response.json()[
        "items"][0]["content"] == FIRST_TEST_NOTE["items"][0]["content"]
    assert len(response.json()["items"]) == len(FIRST_TEST_NOTE["items"])


def test_create_note(mongo_mock):
    response = client.post(
        "/note",
        json={
            "title": "New Test Note",
            "content": "This is a new test note."
        }
    )
    assert response.status_code == 200
    assert response.json()["title"] == "New Test Note"
    assert response.json()["items"][0]["content"] == "This is a new test note."
    assert len(response.json()["items"]) == 1


def test_search_note(mongo_mock):
    response = client.get("/note/search/Test")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    notes = response.json()
    assert len(notes) == 1
    assert notes[0]["title"] == "Test Note"


def test_update_note(mongo_mock):
    response = client.patch(
        "/note/67ebbe31e2a27ddd8b6b21ad",
        json={
            "content": "This is a test note. It has  been updated",
        }
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Test Note"
    assert response.json()["items"][0]["content"] == "This is a test note."
    assert response.json()[
        "items"][1]["content"] == "This is a test note. Add new features"
    assert response.json()[
        "items"][2]["content"] == "This is a test note. It has  been updated"
    assert len(response.json()["items"]) == 3


def test_delete_note(mongo_mock):
    response = client.delete("/note/67ebbe31e2a27ddd8b6b21ad")
    assert response.status_code == 200
    assert response.json()["message"] == "Note deleted successfully"
    response = client.get("/note/67ebbe31e2a27ddd8b6b21ad")
    assert response.status_code == 404


def gotback_to_sha1(mongo_mock):
    entry = FIRST_TEST_NOTE["items"][0]
    firts_content_sha1 = hashlib.sha1(entry.content.encode()).hexdigest()
    response = client.get(f"/note/67ebbe31e2a27ddd8b6b21ad/{firts_content_sha1}")
    assert response.status_code == 200
    assert response.json()["items"][0]["content"] == entry.content
    assert len(response.json()["items"]) == 1
