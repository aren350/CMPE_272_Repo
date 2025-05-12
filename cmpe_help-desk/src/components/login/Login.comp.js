import React from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Login = ({handleOnchange,handleOnsubmit,formSwitcher, email, pass}) => {
    const navigate = useNavigate()

    const { loginWithRedirect, isAuthenticated, user, logout, getAccessTokenSilently } = useAuth0();

    const handleClick =() => {
        navigate('/dashboard')
    }

    // useEffect(() => {
    //     const logUserIntoBackend = async () => {
    //       try {
    //         const token = await getAccessTokenSilently();
    
    //         const response = await fetch('IDK ENDPOINT', {
    //           method: 'GET',
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //           },
    //         });
    
    //         if (!response.ok) {
    //           throw new Error('Failed to log in to backend');
    //         }
    
    //         const data = await response.json();
    //         console.log('Backend login successful:', data);
    //       } catch (err) {
    //         console.error('Error logging in to backend:', err);
    //       }
    //     };
    
    //     if (isAuthenticated) {
    //       logUserIntoBackend();
    //     }
    //   }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <Container>
        <Row>
            <Col>
            <h1>Client Login </h1>
            <hr /> 

            {!isAuthenticated ? (
            <Button onClick={() => loginWithRedirect()}>
              Login
            </Button>
          ) : (
            <>
              <p>Welcome, {user.name}!</p>
              <div><Button  onClick={handleClick}>To the DashBoard</Button></div>

              <Button className="mt-2" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </Button>
            </>
          )}
            <hr />
            </Col>
        </Row>
        <Row>
            <Col>
            <a href ="#!" onClick={() => formSwitcher('reset')}>Forgot Password?</a>
            </Col>
        </Row>
    </Container>
  )
}

Login.propTypes ={
    handleOnchange: PropTypes.func.isRequired,
    handleOnsubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired
};