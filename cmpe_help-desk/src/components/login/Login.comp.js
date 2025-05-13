import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      localStorage.setItem('username', user.email);

      // Set role based on email
      const adminEmails = ['admin@email.com', 'techtonic@email.com'];
      const userRole = adminEmails.includes(user.email) ? 'admin' : 'user';
      setRole(userRole);
      localStorage.setItem('role', userRole);
      console.log("username:", user.email);
      console.log("role:", userRole);
      // Navigate after login
      navigate('/tickets/');
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <div>
          <p>Welcome, {user.name || user.email}</p>
          <p>Role: {role}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
          <br />
          <button style={{ marginTop: '1rem' }} onClick={() => navigate('/dashboard')}>
            Proceed to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
