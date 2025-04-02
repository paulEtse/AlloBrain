# AlloBrain Application - Docker Setup
https://alloreview.notion.site/experienced-fullstack-dev-technical-test

## Overview
This document provides a guide on how to set up and run the note application. The application use :
- **MongoDB**: The primary database
- **FastAPI Backend**: Handles API requests and connects to MongoDB
- **React Frontend**: The user interface for the application

## Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

You can also run the app without docker. Then you'll need a mongo database to store data. Launch the frontend and backend by following instructions in their README files.

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
Your application should now be up and running! 🎉
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:7000](http://localhost:7000)
- **Mongo Express**: [http://localhost:8081](http://localhost:8081)

The swagger of backend is accessible via [http://localhost:7000/docs](http://localhost:7000/docs)


## Further infomation
For more details look at README files of the frontend and the backend