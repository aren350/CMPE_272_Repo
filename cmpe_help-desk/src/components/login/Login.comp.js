import React from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React, { useState } from 'react';

export const Login = ({handleOnchange,handleOnsubmit,formSwitcher, email, pass}) => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const handleOnsubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        sessionStorage.setItem('username', username); // clears when tab is closed
        if (username === 'admin@email.com') {
            setRole('admin');
            localStorage.setItem('role', 'admin');
          } else {
            setRole('user');
            localStorage.setItem('role', 'user');
          }
        console.log('Role:', role)
      };

  return (
    <Container>
        <Row>
            <Col>
            <h1>Client Login </h1>
            <hr /> 
            <Form onSubmit={handleOnsubmit}>
                <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value = {email}
                        onChange={(e) => setUsername(e.target.value)}
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
            </Form>
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