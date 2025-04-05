import React from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
export const ResetPassword = ({handleOnchange,handleOnresetsubmit,formSwitcher,email}) => {
  return (
    <Container>
        <Row>
            <Col>
            <h1>Reset Password </h1>
            <hr /> 
            <Form onSubmit={handleOnresetsubmit}>
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
                <Button type="submit"> Get Password Reset Link </Button>
            </Form>
            <hr />
            </Col>
        </Row>
        <Row>
            <Col>
            <a href ="#!" onClick={() => formSwitcher("login")}>Back to Login</a>
            </Col>
        </Row>
    </Container>
  )
}

ResetPassword.propTypes ={
    handleOnchange: PropTypes.func.isRequired,
    handleOnresetsubmit: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
};