import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const AddTicketForm = ({handleOnsubmit,handleOnchange, frmDt}) => {
    console.log(frmDt)
  return (
    <div className= "mt-2 add-new-ticket" class= "col-md-5 fs-5">
        <Form onSubmit={handleOnsubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm ={3}>Subject</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            name="subject"
                            value = {frmDt.subject}
                            onChange={handleOnchange}
                            required/>
                    </Col>
                </Form.Group>
                <Form.Group as ={Row}>
                    <Form.Label column sm={3}>Issue Date</Form.Label>
                    <Col sm= {9}>
                        <Form.Control
                            type="date"
                            value = {frmDt.date}
                            name="issueDate"
                            onChange={handleOnchange }
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={frmDt.detail}
                        name="detail"
                        rows ="5"
                        onChange={handleOnchange }
                        required
                    />
                </Form.Group>
                <Button type="submit" variant = "info"> Add </Button>
            </Form>

    </div>
    
  )
}

AddTicketForm.propTypes = {
    handleOnsubmit: PropTypes.func.isRequired, 
    handleOnchange: PropTypes.func.isRequired,
    frmDt: PropTypes.object.isRequired
}
