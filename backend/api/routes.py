import boto3
from flask_cors import CORS
from flask import Flask, request, jsonify, abort
from botocore.exceptions import ClientError
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import openai
import json
import traceback
import re

app = Flask(__name__)
CORS(app)

# Load OpenAI API key from config.json
with open("config.json") as f:
    config = json.load(f)

client = openai.OpenAI(api_key=config.get("openai_api_key"))

# Create a boto3 session with the default profile
session = boto3.Session(profile_name="default", region_name="us-east-2")
dynamodb = session.resource('dynamodb')
ticket_table = dynamodb.Table('Tickets')
users_table = dynamodb.Table('Users')

def classify_ticket(title, description):
    prompt = f"""
    Analyze the following IT support ticket and classify it.
    Return a JSON with 'priority' (high, medium, low) and 'category' (e.g., network, hardware, software, login).

    Title: {title}
    Description: {description}
    """
    try:
        print("Calling OpenAI API with:", title, description)
        print("Waiting for OpenAI response...")
        response = client.chat.completions.create(
            
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=100,
            timeout=10
        )
        print("LLM raw response:", response)
        print("LLM message content:", response.choices[0].message.content)
        content = response.choices[0].message.content.strip()
        json_match = re.search(r"\{.*\}", content, re.DOTALL)
        if not json_match:
            raise ValueError("No valid JSON object found in LLM response")

        result = json.loads(json_match.group())
        return result.get('priority', 'medium'), result.get('category', 'general')
    
    except Exception as e:
        print("LLM classification failed:")
        traceback.print_exc()
        return 'medium', 'general'

# GET all tickets
@app.route('/tickets', methods=['GET'])
def get_all_tickets():
    try:
        response = ticket_table.scan()
        return jsonify(response.get('Items', [])), 200
    except ClientError as e:
        abort(500, description=str(e))

# GET ticket by ID
@app.route('/tickets/<ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    try:
        response = ticket_table.get_item(Key={'TicketId': ticket_id})
        item = response.get('Item')
        if item:
            return jsonify(item), 200
        else:
            abort(404, description="Ticket not found")
    except ClientError as e:
        abort(500, description=str(e))

# POST a new ticket
@app.route('/tickets', methods=['POST'])
def create_ticket():
    data = request.get_json()
    if not data or 'title' not in data or 'description' not in data or 'username' not in data:
        abort(400, description="Missing required fields including username")

    # Check if the user exists
    try:
        user_check = users_table.get_item(Key={'Name': data['username']})
        if 'Item' not in user_check:
            abort(400, description="User does not exist")
    except ClientError as e:
        abort(500, description=f"User lookup failed: {str(e)}")
        abort(400, description="Missing required fields")
    ticket_id = str(uuid.uuid4())

    # Classify using LLM only when priority/category isn't set
    if 'priority' not in data or 'category' not in data:
        priority, category = classify_ticket(data["title"], data["description"])
    else:
        priority = data["priority"]
        category = data["category"]

    ticket = {
        "TicketId": ticket_id,
        "created_by": data.get("username", "unknown"),
        "title": data["title"],
        "description": data["description"],
        "status": "open",
        "priority": priority,
        "category": category
    }
    try:
        ticket_table.put_item(Item=ticket)
        return jsonify(ticket), 201
    except ClientError as e:
        abort(500, description=str(e))

# PUT update ticket
@app.route('/tickets/<ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    data = request.get_json()
    update_expr = []
    expr_attr_vals = {}
    for k in ['title', 'description', 'status']:
        if k in data:
            update_expr.append(f"{k} = :{k}")
            expr_attr_vals[f":{k}"] = data[k]
    if not update_expr:
        abort(400, description="No valid fields to update")
    try:
        response = ticket_table.update_item(
            Key={'TicketId': ticket_id},
            UpdateExpression="SET " + ", ".join(update_expr),
            ExpressionAttributeValues=expr_attr_vals,
            ReturnValues="ALL_NEW"
        )
        return jsonify(response['Attributes']), 200
    except ClientError as e:
        abort(500, description=str(e))

# DELETE all tickets
@app.route('/tickets', methods=['DELETE'])
def delete_all_tickets():
    try:
        scan = ticket_table.scan()
        with ticket_table.batch_writer() as batch:
            for item in scan.get('Items', []):
                batch.delete_item(Key={'TicketId': item['TicketId']})
        return jsonify({"message": "All tickets deleted"}), 200
    except ClientError as e:
        abort(500, description=str(e))

# DELETE ticket
@app.route('/tickets/<ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    try:
        ticket_table.delete_item(Key={'TicketId': ticket_id})
        return jsonify({"message": "Ticket deleted"}), 200
    except ClientError as e:
        abort(500, description=str(e))

# Login User
@app.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    try:
        response = users_table.get_item(Key={'Name': username})
        user = response.get('Item')
        if not user:
            return jsonify({'error': 'User not found'}), 404

        if not check_password_hash(user['Password'], password):
            return jsonify({'error': 'Incorrect password'}), 401

        return jsonify({'message': 'Login successful', 'username': username, 'role': user.get('Role', 'user')}), 200

    except ClientError as e:
        return jsonify({'error': str(e)}), 500
    
# Signup User
@app.route('/signup', methods=['POST'])
def signup_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    try:
        # Check if user already exists
        response = users_table.get_item(Key={'Name': username})
        if 'Item' in response:
            return jsonify({'error': 'User already exists'}), 409

        # Hash password before storing
        hashed_pw = generate_password_hash(password)

        # Add user
        users_table.put_item(Item={
            'Name': username,
            'Password': hashed_pw,
            'Role': data.get('role', 'user')
        })

        return jsonify({'message': 'User created successfully'}), 201

    except ClientError as e:
        return jsonify({'error': str(e)}), 500

# GET user by username (for testing)
@app.route('/users/<username>', methods=['GET'])
def get_user(username):
    try:
        response = users_table.get_item(Key={'Name': username})
        item = response.get('Item')
        if item:
            return jsonify(item), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except ClientError as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
