import logging
import os

import pymongo
from dotenv import load_dotenv

logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(message)s", level=logging.INFO
)

load_dotenv()

conf = {
    "DATABASE": os.environ.get("DATABASE"),
    "DB_CONNEXION_STRING": os.environ.get("DB_CONNEXION_STRING"),
}


def get_db():
    """
    Get the database connection.
    """
    CLIENT = pymongo.MongoClient(conf["DB_CONNEXION_STRING"])
    db = CLIENT[conf["DATABASE"]]
    return db
