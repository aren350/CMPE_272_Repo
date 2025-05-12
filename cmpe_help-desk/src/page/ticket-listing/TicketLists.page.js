import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  const username = localStorage.getItem('username');

  useEffect(() => {
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
  }, [username]);

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
              }}
            >
              <h3>{ticket.title}</h3>
              <p><strong>Description:</strong> {ticket.description}</p>
              <p><strong>Category:</strong> {ticket.category}</p>
              <p><strong>Priority:</strong> {ticket.priority}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Tag:</strong> {ticket.tag || 'None'}</p>
              <p><strong>Created by:</strong> {ticket.created_by}</p>
              {ticket.created_at && <p><strong>Created at:</strong> {new Date(ticket.created_at).toLocaleString()}</p>}
              {ticket.updated_at && <p><strong>Updated at:</strong> {new Date(ticket.updated_at).toLocaleString()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
