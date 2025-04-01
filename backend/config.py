import json
import logging
import pathlib
import pymongo

logging.basicConfig(
    format="%(asctime)s: %(levelname)s: %(message)s", level=logging.INFO
)
ROOT = pathlib.Path(__file__).parent
with open(ROOT / "config.json", encoding="utf-8") as config_file:
    conf = json.load(config_file)

CLIENT = pymongo.MongoClient(conf["DB_CONNEXION_STRING"])
db = CLIENT[conf["DATABASE"]]
