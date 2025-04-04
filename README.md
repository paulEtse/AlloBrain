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

You can also run the app without docker. Then, you'll need a mongo database to store data. Launch the frontend and backend by following instructions in their README files.

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
- **Frontend**: [http://localhost:7173](http://localhost:7173)
- **Backend API**: [http://localhost:6173](http://localhost:6173)
- **Mongo Express**: [http://localhost:9173](http://localhost:9173)

The swagger of backend is accessible via [http://localhost:6173/docs](http://localhost:6173/docs)

### 4. Troubleshoot port problems
To stop all services, run:
```sh
docker-compose down
```

## Troubleshoot port problems
If you having problems using a particular port, you can change it .env file in the root folder of the project.

## Further infomation
For more details look at README files of the frontend and the backend