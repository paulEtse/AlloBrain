import logging
import os

import pymongo
from dotenv import load_dotenv

logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(message)s", level=logging.INFO
)

load_dotenv()


def get_db():
    """
    Get the database connection.
    """
    CLIENT = pymongo.MongoClient(os.environ.get("DB_CONNEXION_STRING"))
    db = CLIENT[os.environ.get("DATABASE")]
    return db
