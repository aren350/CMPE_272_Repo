import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAIPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.setItem('username', 'arenrohan@gmail.com')
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!title || !description) {
      setError('Title and Description are required');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/tickets', {
        title,
        description,
        tag,  // Optional, since backend may not handle 'tag' yet
        username
      });

      console.log('Ticket created:', response.data);
      navigate('/tickets');
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Failed to create ticket');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Create a New Ticket</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Description:</label><br />
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label>Tag (optional):</label><br />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Ticket</button>
      </form>
    </div>
  );
}

export default CreateAIPage;