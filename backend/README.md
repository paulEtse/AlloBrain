## Dev environnment

## Database configuration
Create mongo db 
Update the config.json file with your connextion informations to the db
```
{
"DB_CONNEXION_STRING": "mongodb+srv://username:password@mongodbserver.com",
"DATABASE": "Database Name"
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
uvicorn main:app --host 0.0.0.0 --port 7000 --workers 1 --reload
```
API documentation  at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

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
pytest test
```
