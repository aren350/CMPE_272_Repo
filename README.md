# Help Desk Support Ticketing System

A fullstack internal support portal for managing IT service tickets across an organization. Built with a **Flask backend**, **AWS DynamoDB**, and a **React frontend**, this system supports ticket submission, AI-based classification, user authentication, and role-based access control.

## Team Members
- Shloak Aggrawal
- Rohan Aren
- Taha Kamran
- Karan Sharma 

## Project Structure of Important Files

```
.
├── backend/                     # Flask API + LLM logic + DynamoDB integration
│   ├── ai/ticket_handling.py    # Task dispatching utilizing AI action handlers by category
│   ├── api/routes.py            # API routes
│   ├── Dockerfile               # Docker configuration for deploying backend containers
│   ├── app.py                   # Running the Flask App
│   ├── config.json              # OpenAI API key + config
│   ├── test.py                  # Automated Unit and Integration Tests
│   └── shared.py                # Reusable resources like ticket_table
└── cmpe_help-desk/              # React client app
│   └── Dockerfile               # Docker configuration for deploying frontend containers
```

## Features

-  User Signup/Login with password hashing
-  Role-Based Access (admin, agent, user)
-  Ticket Management (create, update, delete, fetch)
-  LLM Integration (uses OpenAI GPT to auto-categorize and prioritize tickets)
-  AI Task Routing based on category (e.g., delete user, retrieve logs)
-  DynamoDB storage for Users and Tickets
-  React Frontend for employee submission and admin dashboard

##  Tech Stack

| Layer      | Tech                                    |
|------------|-----------------------------------------|
| Backend    | Flask, Python, Boto3, OpenAI            |
| Frontend   | React, Axios, React Router              |
| Database   | AWS DynamoDB                            |
| Auth       | Role-based (user/admin), Auth0 SSO      |
| DevOps     | AWS, CodePipeline, EKS, ELB, Docker     |
| AI         | OpenAI GPT-4 (via API)                  |

## LLM Behavior

When a ticket is submitted without a `"priority"` or `"category"`, the backend will:
- Call OpenAI’s GPT model (e.g., `gpt-4o`)
- Extract `priority` (`high`, `medium`, `low`)
- Extract `category` (`network`, `software`, `delete`, `logs`, etc.)
- Dispatch the task to a relevant handler (e.g., delete user or log retrieval)

## Sample Ticket Submission
A simple test connection to see if your OpenAI model has been succesfully connected with your config.json api key is running this command within the backend folder to create a ticket. 
```bash
curl -X POST http://127.0.0.1:5000/tickets \
-H "Content-Type: application/json" \
-d '{
  "title": "VPN access not working",
  "description": "Cannot connect to company VPN from home.",
  "username": "jdoe"
}'
```

## Routes Summary

| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| POST   | `/signup`                    | Create new user              |
| POST   | `/login`                     | Authenticate user            |
| GET    | `/tickets`                   | Fetch all tickets            |
| GET    | `/tickets/<id>`              | Fetch single ticket by ID    |
| GET    | `/tickets/user/<username>`   | Get tickets by creator       |
| POST   | `/tickets`                   | Submit new ticket (LLM-based)|
| PUT    | `/tickets/<id>`              | Update ticket info           |
| DELETE | `/tickets/<id>`              | Delete ticket by ID          |
| DELETE | `/tickets`                   | Delete all tickets           |

##  How to Run (Locally)

###  Backend Setup
Set up your virtual environment and download dependences:
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Set your OpenAI key and LLM config in `config.json`:
```json
{
  "openai_api_key": "sk-...",
  "enable_llm": true
}
```

Configure AWS credentials:
```bash
aws configure  # enter access key, secret, region (us-east-2)
```

Then run the Flask server:
```bash
python app.py
```

Before running, you can also test Routes:
```bash
pip install pytest
pytest test.py
```
An example of a successful run:
![image](https://github.com/user-attachments/assets/e570cb2c-92ee-4b92-865b-11b14cd0298d)

Docker Deployment:
```bash
cd backend
docker build -t helpdesk-backend .
docker run -p 5000:5000 helpdesk-backend
```

### Frontend Setup
Running in terminal
```bash
cd cmpe_help-desk
npm install
npm start
```

Runs on: `http://localhost:3000`

Docker Deployment:
```bash
cd cmpe_help-desk
docker build -t helpdesk-frontend .
docker run -p 3000:80 helpdesk-frontend
```

## Application Flow
![image](https://github.com/user-attachments/assets/f9663abc-55de-4126-ad0c-26f4542fc807)
![image](https://github.com/user-attachments/assets/4f67cbd7-4151-4991-b555-81fa3cd6db3b)
![image](https://github.com/user-attachments/assets/28b2f19a-92b2-499a-a1a2-0290d5c19c2c)
![image](https://github.com/user-attachments/assets/c4b70ca3-bcc6-463a-968f-1100e9d892b4)
![image](https://github.com/user-attachments/assets/fd337313-a451-4053-934b-5101d13d7ad7)
![image](https://github.com/user-attachments/assets/5da527b5-0eb0-44b6-bb8b-ac1b87c4df48)
![image](https://github.com/user-attachments/assets/7ece5195-7245-4714-80f3-aa230e86cc23)
![image](https://github.com/user-attachments/assets/f19ff540-54a4-4aca-9472-f647546230a4)

## Example of Removing Entities from Database
![image](https://github.com/user-attachments/assets/5d76fc88-edb3-4587-aba1-955bb4aa8e86)
![image](https://github.com/user-attachments/assets/89d7d924-245d-4a17-94ec-dcaa0c32d2f3)
![image](https://github.com/user-attachments/assets/610e7c19-87aa-4430-81f6-032369db4ffd)

## Deployment on AWS 
![image](https://github.com/user-attachments/assets/c02f6ca4-061d-41c5-8b71-f092607e543d)
![image](https://github.com/user-attachments/assets/839fb77e-f9b8-4d38-a0a9-951f5cb9000d)






