import json
import boto3
import pytest
from unittest.mock import patch, MagicMock
from api.routes import app, register_routes
from boto3.dynamodb.conditions import Attr

# Register Flask routes before testing
register_routes(app)

# Setup DynamoDB resources
dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
ticket_table = dynamodb.Table('Tickets')
users_table = dynamodb.Table('Users')


# Flask test client fixture
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


# Automatically mock OpenAI API for all tests
@pytest.fixture(autouse=True)
def mock_openai_api():
    with patch('api.routes.client.chat.completions.create') as mock_create:
        # Mimic a valid OpenAI response
        mock_response = MagicMock()
        mock_message = MagicMock()
        mock_message.content = '{"priority": "medium", "category": "general"}'
        mock_choice = MagicMock()
        mock_choice.message = mock_message
        mock_response.choices = [mock_choice]
        mock_create.return_value = mock_response
        yield


# Create a test user before all tests and delete afterward
@pytest.fixture(scope='module', autouse=True)
def setup_user():
    users_table.put_item(Item={"Name": "test_user"})
    yield
    users_table.delete_item(Key={"Name": "test_user"})


# Helpers
def create_test_ticket(ticket_id="test123"):
    item = {
        "TicketId": ticket_id,
        "Title": "Test ticket",
        "Description": "This is a test",
        "Status": "open",
        "priority": "medium",
        "category": "general",
        "created_by": "test_user"
    }
    ticket_table.put_item(Item=item)
    return item

def delete_test_ticket(ticket_id="test123"):
    ticket_table.delete_item(Key={"TicketId": ticket_id})


# ----------------- Tests -------------------

def test_get_all_tickets(client):
    create_test_ticket("test123")
    response = client.get('/tickets')
    assert response.status_code == 200
    assert isinstance(response.json, list)
    delete_test_ticket("test123")


def test_get_ticket_by_id_found(client):
    create_test_ticket("test456")
    response = client.get('/tickets/test456')  # Corrected route
    assert response.status_code == 200
    assert response.json['TicketId'] == 'test456'
    delete_test_ticket("test456")


def test_get_ticket_by_id_not_found(client):
    response = client.get('/tickets/doesnotexist')  # Corrected route
    assert response.status_code == 404


def test_create_ticket_success(client):
    payload = {
        "title": "VPN problem",
        "description": "Cannot connect to VPN",
        "username": "test_user"
    }
    response = client.post('/tickets', data=json.dumps(payload), content_type='application/json')
    assert response.status_code == 201

    # Validate ticket contents
    json_data = response.get_json()
    assert "TicketId" in json_data
    assert json_data["title"] == payload["title"]
    assert json_data["description"] == payload["description"]
    assert json_data["created_by"] == payload["username"]

    # Cleanup: delete test-created ticket(s)
    result = ticket_table.scan(
        FilterExpression=Attr("Title").eq("VPN problem")
    )
    for item in result.get('Items', []):
        delete_test_ticket(item['TicketId'])


def test_create_ticket_missing_fields(client):
    payload = {
        "title": "Oops",
        "description": "No user"
    }
    response = client.post('/tickets', data=json.dumps(payload), content_type='application/json')
    assert response.status_code == 400


def test_update_ticket_success(client):
    # Create ticket
    payload_create = {
        "title": "Initial title",
        "description": "Initial description",
        "username": "test_user"
    }
    create_response = client.post('/tickets', data=json.dumps(payload_create), content_type='application/json')
    assert create_response.status_code == 201
    ticket = create_response.get_json()
    ticket_id = ticket.get("TicketId")
    assert ticket_id is not None

    # Update ticket
    payload_update = {
        "title": "Updated title",
        "description": "Updated description",
        "status": "closed"
    }
    update_response = client.put(f'/tickets/{ticket_id}', data=json.dumps(payload_update), content_type='application/json')
    assert update_response.status_code == 200

    updated_ticket = update_response.get_json()
    assert updated_ticket["Title"] == "Updated title"
    assert updated_ticket["Status"] == "closed"

    # Cleanup
    delete_test_ticket(ticket_id)


def test_delete_all_tickets(client):
    create_test_ticket("t1")
    create_test_ticket("t2")
    response = client.delete('/tickets')
    assert response.status_code == 200
    assert response.json['message'] == 'All tickets deleted'

    remaining = ticket_table.scan()
    assert all(t['TicketId'] not in ['t1', 't2'] for t in remaining.get('Items', []))
