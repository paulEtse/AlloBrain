import json
import logging
import pathlib

import pymongo


logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(message)s", level=logging.INFO
)
ROOT = pathlib.Path(__file__).parent.parent
with open(ROOT / "config.json", encoding="utf-8") as config_file:
    conf = json.load(config_file)


def get_db():
    """
    Get the database connection.
    """
    print("Using real db")
    CLIENT = pymongo.MongoClient(conf["DB_CONNEXION_STRING"])
    db = CLIENT[conf["DATABASE"]]
    return db
