from pydantic import BaseModel
import boto3
import json
import openai

# Define Ticket model (if needed in FastAPI, not Flask)
class Ticket(BaseModel):
    id: int
    description: str
    category: str

# Load OpenAI API key from config.json
with open("config.json") as f:
    config = json.load(f)

client = openai.OpenAI(api_key=config.get("openai_api_key"))

# Create a boto3 session with the default profile
session = boto3.Session(region_name="us-east-2")
dynamodb = session.resource('dynamodb')
ticket_table = dynamodb.Table('Tickets')
users_table = dynamodb.Table('Users')