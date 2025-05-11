import React from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Login = ({handleOnchange,handleOnsubmit,formSwitcher, email, pass}) => {
    const navigate = useNavigate()

    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    const handleClick =() => {
        navigate('/dashboard')
    }

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

            {/* <Form onSubmit={handleOnsubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value = {email}
                        onChange={handleOnchange}
                        placeholder= "Enter your Email"
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label className='mt-1'>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={pass}
                        onChange={handleOnchange }
                        placeholder= "Enter your Password"
                        required
                    />
                </Form.Group>
                <Button className = "mt-3" type="submit"> Login </Button>
            </Form> */}
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