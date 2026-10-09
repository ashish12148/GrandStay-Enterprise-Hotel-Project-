# 🏨 GrandStay – Enterprise Hotel Booking Application

## 📌 Project Overview

GrandStay is an enterprise-style hotel booking application designed to demonstrate modern application development and DevOps practices.

The application allows users to view hotel rooms, retrieve room information through APIs, and create and view booking records.

The project uses a React frontend, Python Flask backend, MongoDB database, Docker containers, Nginx, and AWS EC2 for deployment.

## 🎯 Project Objectives

* Build a full-stack hotel booking application.
* Containerize the frontend and backend using Docker.
* Configure communication between frontend and backend APIs.
* Use MongoDB for application data.
* Deploy the application on an AWS EC2 Ubuntu server.
* Maintain project source code using Git and GitHub.
* Extend the project with CI/CD and monitoring tools.

## 🛠️ Technologies Used

| Technology     | Purpose                                |
| -------------- | -------------------------------------- |
| React          | Frontend development                   |
| Python Flask   | Backend API development                |
| Gunicorn       | Python application server              |
| MongoDB Atlas  | Database service                       |
| Docker         | Application containerization           |
| Docker Compose | Multi-container application management |
| Nginx          | Frontend web server and reverse proxy  |
| AWS EC2        | Cloud deployment                       |
| Ubuntu         | Server operating system                |
| Git            | Version control                        |
| GitHub         | Source code hosting                    |

## 🏗️ Project Architecture

```text
                User / Browser
                      |
                      v
                React Frontend
                      |
                      v
                    Nginx
                      |
                      v
              Flask Backend API
                      |
                      v
                 MongoDB Atlas

        AWS EC2 Ubuntu Server
        ├── Frontend Container
        └── Backend Container

        Docker Compose
        └── Container Management
```

## 📂 Project Structure

```text
GrandStay-Enterprise-Hotel-Project/
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/
│   ├── Application source code
│   └── Backend dependencies
│
├── docker-compose.yml
└── README.md
```

Note: The structure above describes the intended project organization. Verify the actual backend filenames and directories in the repository before finalizing this section.

## ⚙️ Project Implementation

### Step 1: Frontend Development

* Developed the user interface using React.
* Configured the frontend application.
* Updated the API requests to use application routes.

### Step 2: Backend API

* Used Python Flask to provide backend APIs.
* Configured room-related API requests.
* Configured booking creation and booking-list API requests.
* Used Gunicorn to serve the Python application.

### Step 3: Database Configuration

* Configured the application to connect to MongoDB Atlas.
* Verified the backend database connection.
* Prepared the application to work with room and booking data.

### Step 4: Docker Configuration

* Created a Dockerfile for the frontend.
* Configured Nginx to serve the frontend and handle API routing.
* Prepared Docker Compose configuration for managing the application containers.

### Step 5: AWS EC2 Deployment

* Used an Ubuntu EC2 instance for deployment.
* Ran the application using Docker containers.
* Tested the application and its API endpoints.

### Step 6: API Testing

The following application features were tested during development:

* Room listing API.
* Booking creation.
* Booking list API.
* Backend database connectivity.

## 🚀 How to Run the Project

### Prerequisites

Install or configure the following:

* Git
* Docker
* Docker Compose
* MongoDB Atlas account or an appropriate MongoDB instance
* Python and Node.js if running the applications outside Docker

### Step 1: Clone the Repository

```bash
git clone https://github.com/ashish12148/GrandStay-Enterprise-Hotel-Project-.git
```

### Step 2: Enter the Project Directory

```bash
cd GrandStay-Enterprise-Hotel-Project-
```

### Step 3: Configure Environment Variables

Configure the required backend environment variables, including the MongoDB connection string and any application secrets.

Do not commit passwords, database credentials, API keys, or secret environment files to GitHub.

### Step 4: Start the Application

After confirming that the Docker Compose configuration and backend files are present, run:

```bash
docker compose up -d --build
```

### Step 5: Check Running Containers

```bash
docker compose ps
```

### Step 6: View Application Logs

```bash
docker compose logs -f
```

Note: The startup commands depend on the final Docker Compose configuration and the required environment variables.

## ☁️ AWS Deployment

The application was deployed and tested on an AWS EC2 Ubuntu server.

Deployment workflow:

1. Launch and configure an EC2 Ubuntu instance.
2. Install Docker and the required dependencies.
3. Transfer or clone the project files.
4. Configure the required environment variables.
5. Build and start the Docker containers.
6. Configure security group rules for the required ports.
7. Access the application through the EC2 public IP address.
8. Test the frontend and backend APIs.

## 🔄 DevOps Workflow

The intended DevOps workflow is:

```text
Developer
    |
    v
Git / GitHub
    |
    v
Jenkins CI/CD
    |
    v
Docker Image Build
    |
    v
Application Deployment
    |
    v
AWS EC2
    |
    v
Prometheus + Grafana
```

Jenkins CI/CD and Prometheus/Grafana monitoring are planned extensions and should be marked completed only after they have been configured and tested.

## 📈 Future Improvements

* Automate application builds and deployments using Jenkins.
* Integrate code quality analysis using SonarQube.
* Configure monitoring using Prometheus and Grafana.
* Improve application logging and error handling.
* Add automated testing.
* Improve security and production deployment configuration.

## 👨‍💻 Author

**Ashish Pokale**

DevOps and Cloud Computing Enthusiast

Skills: AWS, Docker, Kubernetes, Jenkins, Terraform, Git, GitHub, Linux and CI/CD.

## 📜 Disclaimer

This project is intended for learning and demonstration of full-stack development and DevOps deployment practices.
