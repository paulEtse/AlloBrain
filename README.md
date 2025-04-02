# AlloBrain Application - Docker Setup

## Overview
This document provides a guide on how to set up and run the note application using Docker. The application consists of:
- **MongoDB**: The primary database
- **Mongo Express**: A web-based MongoDB admin interface
- **FastAPI Backend**: Handles API requests and connects to MongoDB
- **React Frontend**: The user interface for the application

## Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Installation

### 1. Clone the Repository
```sh
 git clone https://github.com/paulEtse/alloBrain.git
 cd allobrain
```

### 2. Start the Application
To start all services, run:
```sh
docker-compose up -d --build
```


## Conclusion
Your application should now be up and running! 🎉
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:7000](http://localhost:7000)
- **Mongo Express**: [http://localhost:8081](http://localhost:8081)

The swagger of backend is accessible via [http://localhost:7000/docs](http://localhost:7000/docs)


## Services Breakdown

- MongoDB (Database) **Port**: `27017`
- Mongo Express (Database Admin UI) **Port**:`8081`
- Notes Backend (FastAPI) **Port**: `7000`
- Notes Frontend (React + Vite) **Port**: `5173`

## Stopping and Restarting
To stop all containers:
```sh
docker-compose down
```

To restart:
```sh
docker-compose up -d
```

## Further infomation 
For more detail read the README file of the frontend and the backend