import uuid
from botocore.exceptions import ClientError
from shared import ticket_table

# Shared ticket creation function
def create_ticket_from_payload(data):
    ticket_id = str(uuid.uuid4())
    ticket = {
        "TicketId": ticket_id,
        "created_by": data.get("username", "unknown"),
        "title": data["title"],
        "description": data["description"],
        "status": "open",
        "priority": data["priority"],
        "category": data["category"]
    }

    try:
        ticket_table.put_item(Item=ticket)
        return ticket
    except ClientError as e:
        raise RuntimeError(f"Failed to create ticket: {str(e)}")


# Task: User creation-related issues
def creation_task(data):
    print("Running creation_task")
    return create_ticket_from_payload(data)


# Task: Ticket for general support issue
def general_task(data):
    print("Running general_task")
    return create_ticket_from_payload(data)


# Task: Ticket for account or access removal
def delete_task(data):
    print("Running delete_task (logs a deletion request)")
    return create_ticket_from_payload(data)


# Task: Ticket for software installation
def software_installation_task(data):
    print("Running software_installation_task")
    return create_ticket_from_payload(data)


# Task: Ticket for network diagnosis
def network_diagnosis_task(data):
    print("Running network_diagnosis_task")
    return create_ticket_from_payload(data)

# Task: Ticket for logs
def log_task(data):
    print("Running logs_task")
    return create_ticket_from_payload(data)


# Dispatcher: Choose a task function based on category
def dispatch_task_by_category(category, data):
    category = category.lower()
    task_map = {
        "user creation": creation_task,
        "general": general_task,
        "delete": delete_task,
        "software": software_installation_task,
        "network": network_diagnosis_task,
        "logs": log_task
    }

    task_function = task_map.get(category, general_task)
    print(f"Dispatching to: {task_function.__name__}")
    return task_function(data)
