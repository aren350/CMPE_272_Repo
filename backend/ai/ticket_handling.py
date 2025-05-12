import uuid
import os
from botocore.exceptions import ClientError
from shared import ticket_table, users_table

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
        "category": data["category"],
        "tag": data.get("tag", ""),
    }

    try:
        ticket_table.put_item(Item=ticket)
        # Write ticket info to a text file for output
        output_dir = "ticket_outputs"
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"ticket_{ticket_id}.txt")
        with open(output_path, "w") as f:
            for k, v in ticket.items():
                f.write(f"{k}: {v}\n")
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
    print("Running delete_task (executing deletion logic)")

    description = data.get("description", "").lower()

    if "remove user" in description or "delete user" in description:
        # Extract username from description (simple example)
        import re
        match = re.search(r'for (\w+)', description)
        if not match:
            return {"error": "Username not found in description for user deletion"}

        username = match.group(1)
        try:
            users_table.delete_item(Key={"Name": username})
            return {"message": f"User '{username}' deleted from Users table"}
        except ClientError as e:
            return {"error": f"Failed to delete user: {str(e)}"}

    elif "delete ticket" in description or "ticket id" in description:
        # Expect ticket_id in the payload
        ticket_id = data.get("ticket_id")
        if not ticket_id:
            return {"error": "Missing 'ticket_id' for ticket deletion"}

        try:
            ticket_table.delete_item(Key={"TicketId": ticket_id})
            return {"message": f"Ticket '{ticket_id}' deleted from Tickets table"}
        except ClientError as e:
            return {"error": f"Failed to delete ticket: {str(e)}"}

    else:
        return {"message": "No valid delete command recognized in description"}


# Task: Ticket for software installation
def software_installation_task(data):
    print("Running software_installation_task")
    return create_ticket_from_payload(data)


# Task: Ticket for network diagnosis
def network_diagnosis_task(data):
    print("Running network_diagnosis_task")
    return create_ticket_from_payload(data)

# Task: Fetch tickets by tag for logs
def log_task(data):
    print("Running logs_task (fetching by tag)")
    tag = data.get("tag", "")
    if not tag:
        raise ValueError("Tag must be provided in the payload for log tickets.")
    # Query DynamoDB for tickets with the given tag
    try:
        response = ticket_table.scan(
            FilterExpression="tag = :tagval",
            ExpressionAttributeValues={":tagval": tag}
        )

        tickets = response.get("Items", [])
        # Output results to a text file
        output_dir = "ticket_outputs"
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"log_query_tag_{tag}.txt")
        with open(output_path, "w") as f:
            for ticket in tickets:
                f.write("---\n")
                for k, v in ticket.items():
                    f.write(f"{k}: {v}\n")
        return tickets
    except ClientError as e:
        raise RuntimeError(f"Failed to fetch tickets by tag: {str(e)}")


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
