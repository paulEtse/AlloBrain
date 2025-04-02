## Dev environnment

## Database configuration
Connect to mongo db 
Create .env file with your connexion informations to the your mongo database
```
{
  "DB_CONNEXION_STRING": "mongodb://admin:password@localhost:27017/",
  "DATABASE": "AlloBrain"
}
```

Set up your development environnment 
```
python -m venv venv
source venv/bin/activate
pip install -r requirements_dev.txt
pip install -r requirements.txt 
```


## Run
```
uvicorn src.main:app --host 0.0.0.0 --port 6173 --workers 1 --reload
```
API documentation  at [http://127.0.0.1:6173/docs](http://127.0.0.1:6173/docs)

## Lint
To sort imports, format and lint files, run these commands:
```
isort --profile black .
black .
flake8 .
```

## Tests 
Launch tests
```
pytest
```
