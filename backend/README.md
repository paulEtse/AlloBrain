## Project Overview
This project is a backend service built with FastAPI and MongoDB. It provides an API for managing notes and integrates with a frontend application.

## Prerequisites
- Python 3.10+
- MongoDB 


## Database Configuration
1. **Set up MongoDB**  
   - Ensure MongoDB is running and accessible.

2. **Create a `.env` file** with your MongoDB connection details:

   ```env
   DB_CONNEXION_STRING=mongodb://admin:password@localhost:8173/
   DATABASE=AlloBrain
   ```

## Setting Up the Development Environment
1. **Create and activate a virtual environment**:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows, use 'venv\Scripts\activate'
   ```

2. **Install dependencies**:

   ```sh
   pip install -r requirements_dev.txt
   pip install -r requirements.txt
   ```

## Running the Application
Start the application with:

```sh
uvicorn src.main:app --host 0.0.0.0 --port 6173 --workers 1 --reload
```

## API Endpoints
| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| POST   | `/note/{id}/{sha1}`     | Revert note to a specific SHA1 version |
| DELETE | `/note/{id}`            | Delete a note by ID           |
| PATCH  | `/note/{id}`            | Update a note                 |
| GET    | `/note/{id}`            | Retrieve a note by ID         |
| GET    | `/note/search/{title}`  | Search for notes by title     |
| POST   | `/note`                 | Create a new note             |
| GET    | `/note`                 | Retrieve paginated notes      |

For full API documentation, visit: [http://127.0.0.1:6173/docs](http://127.0.0.1:6173/docs)

## Linting & Formatting
To sort imports, format the code, and check for linting issues, run:

```sh
isort --profile black .
black .
flake8 .
```

## Running Tests
Execute tests with:

```sh
pytest
```

