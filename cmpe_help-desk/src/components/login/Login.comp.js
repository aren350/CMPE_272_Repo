import React from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
export const Login = ({handleOnchange,handleOnsubmit,formSwitcher, email, pass}) => {
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
                        onChange={handleOnchange}
                        placeholder= "Enter your Email"
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={pass}
                        onChange={handleOnchange }
                        placeholder= "Enter your Password"
                        required
                    />
                </Form.Group>
                <Button type="submit"> Login </Button>
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