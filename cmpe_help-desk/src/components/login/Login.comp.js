import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({handleOnchange,formSwitcher, email, pass}) => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleOnsubmit = (e) => {
        setRole('')
        e.preventDefault();
        
        sessionStorage.setItem('username', username); // clears when tab is closed
        if (username === 'admin@email.com') {
            setRole('admin');
            sessionStorage.setItem('role', 'admin');
          } else {
            setRole('user');
            sessionStorage.setItem('role', 'user');
          }
        console.log('Username:', username);
        console.log('Role:', role, sessionStorage.getItem('role'))
        navigate('/tickets');
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