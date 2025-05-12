import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container,Col,  Row } from 'react-bootstrap'
import { TicketTable } from '../../../components/ticket-table/TicketTable.comp'
import tickets from '../../../assets/data/dummytickets.json'
import { PageBreadcrumb } from '../../../components/breadcrumb/Breadcrumb.comp'
import { Link } from 'react-router-dom'


export const Dashboard = () => {

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    const storedUser = sessionStorage.getItem('username');
    if (storedRole === 'admin') {
        axios.get('http://127.0.0.1:5000/tickets')  // Adjust URL as needed
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        setError('Could not load tickets');
      });       
    }
    else {
        axios.get(`http://127.0.0.1:5000/tickets/'${storedUser}'`)  // Adjust URL as needed
      .then(response => {
        setTickets(response.data);
      })
      .catch(error => {
        console.error('Error fetching tickets:', error);
        setError('Could not load tickets');
      });       
    }
    
  }, []);  // Empty dependency array means this runs once when component mounts

  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {tickets.length === 0 && !error && <p>No tickets found.</p>}

      <div style={{ display: 'grid', gap: '20px' }}>
        {tickets.map((ticket, index) => (
          <div key={index} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{ticket.title || 'Untitled Ticket'}</h3>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Priority:</strong> {ticket.priority}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
            