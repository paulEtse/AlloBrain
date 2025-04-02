import logging

from dotenv import load_dotenv
import pymongo
import os


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
    print("Using real db")
    CLIENT = pymongo.MongoClient(conf["DB_CONNEXION_STRING"])
    db = CLIENT[conf["DATABASE"]]
    return db
