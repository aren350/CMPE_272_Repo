import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    if (!username) {
      setError('No username found in localStorage');
      return;
    }

    axios.get(`http://127.0.0.1:5000/tickets/user/${username}`)
      .then(response => {
        setTickets(response.data);
      })
      .catch(err => {
        console.error('Error fetching tickets:', err);
        setError('Failed to load tickets');
      });
  };

  const handleDelete = (ticketId) => {
    axios.delete(`http://127.0.0.1:5000/tickets/${ticketId}`)
      .then(() => {
        // Remove deleted ticket from state
        setTickets(prev => prev.filter(ticket => ticket.TicketId !== ticketId));
      })
      .catch(err => {
        console.error('Error deleting ticket:', err);
        alert('Failed to delete ticket');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Tickets for {username}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tickets.length === 0 && !error ? (
        <p>No tickets found.</p>
      ) : (
        <div>
          {tickets.map(ticket => (
            <div
              key={ticket.TicketId}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>{ticket.title}</h3>
              <p><strong>Ticket ID:</strong> {ticket.TicketId}</p>
              <p><strong>Description:</strong> {ticket.description}</p>
              <p><strong>Category:</strong> {ticket.category}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Tag:</strong> {ticket.tag || 'None'}</p>
              <p><strong>Created by:</strong> {ticket.created_by}</p>
              {ticket.created_at && <p><strong>Created at:</strong> {new Date(ticket.created_at).toLocaleString()}</p>}
              {ticket.updated_at && <p><strong>Updated at:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>}

              <button
                onClick={() => handleDelete(ticket.TicketId)}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
