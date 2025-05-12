import boto3
from flask_cors import CORS
from flask import Flask, request, jsonify, abort
from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb', region_name='us-east-2')  # Change region as needed
ticket_table = dynamodb.Table('Tickets')  # Make sure this table exists in DynamoDB
users_table = dynamodb.Table('Users') 

@app.route('/')
def home():
    return "hello"


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
    if not data or 'title' not in data or 'description' not in data:
        abort(400, description="Missing required fields")
    # Generate a unique id using uuid
    import uuid
    ticket_id = str(uuid.uuid4())
    ticket = {
        "TicketId": ticket_id,
        "title": data["title"],
        "description": data["description"],
        "status": "open"
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

# DELETE ticket
@app.route('/tickets/<ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    try:
        ticket_table.delete_item(Key={'TicketId': ticket_id})
        return jsonify({"message": "Ticket deleted"}), 200
    except ClientError as e:
        abort(500, description=str(e))

# Signup User
@app.route('/signup', methods=['POST'])
def signup_user(data):
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

        # Add user
        users_table.put_item(Item={
            'Name': username,
            'Password': password  # NEVER store raw passwords in production
        })

        return jsonify({'message': 'User created successfully'}), 201

    except ClientError as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

