from flask import Flask, request, jsonify, abort

app = Flask(__name__)

# In-memory "database"
tickets = {}
ticket_id_counter = 1


# GET all tickets
@app.route('/tickets', methods=['GET'])
def get_all_tickets():
    return jsonify(list(tickets.values())), 200


# GET ticket by ID
@app.route('/tickets/<int:ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    ticket = tickets.get(ticket_id)
    if ticket:
        return jsonify(ticket), 200
    else:
        abort(404, description="Ticket not found")


# POST a new ticket
@app.route('/tickets', methods=['POST'])
def create_ticket():
    global ticket_id_counter
    data = request.get_json()
    if not data or 'title' not in data or 'description' not in data:
        abort(400, description="Missing required fields")
    
    ticket = {
        "id": ticket_id_counter,
        "title": data["title"],
        "description": data["description"],
        "status": "open"
    }
    tickets[ticket_id_counter] = ticket
    ticket_id_counter += 1
    return jsonify(ticket), 201


# PUT update ticket
@app.route('/tickets/<int:ticket_id>', methods=['PUT'])
def update_ticket(ticket_id):
    data = request.get_json()
    ticket = tickets.get(ticket_id)
    if not ticket:
        abort(404, description="Ticket not found")
    
    ticket.update({k: v for k, v in data.items() if k in ['title', 'description', 'status']})
    return jsonify(ticket), 200


# DELETE ticket
@app.route('/tickets/<int:ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    if ticket_id in tickets:
        del tickets[ticket_id]
        return jsonify({"message": "Ticket deleted"}), 200
    else:
        abort(404, description="Ticket not found")


if __name__ == '__main__':
    app.run(debug=True)

