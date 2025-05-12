import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SubmitTicketPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    description: "",
    priority: "",
    tag: "",
    username: ""
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load username from localStorage
  useEffect(() => {
    //localStorage.setItem('username', 'arenrohan@gmail.com')
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData(prev => ({ ...prev, username: storedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://127.0.0.1:5000/tickets', formData);
      navigate('/tickets'); // Redirect after submission
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Failed to submit ticket');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '2rem' }}>
      <h2>Submit a Ticket</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Title:<br />
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label><br /><br />

        <label>Date:<br />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </label><br /><br />

        <label>Category:<br />
          <input name="category" value={formData.category} onChange={handleChange} />
        </label><br /><br />

        <label>Description:<br />
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
        </label><br /><br />

        <label>Priority:<br />
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </label><br /><br />

        <label>Tag:<br />
          <input name="tag" value={formData.tag} onChange={handleChange} />
        </label><br /><br />

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
}

export default SubmitTicketPage;
