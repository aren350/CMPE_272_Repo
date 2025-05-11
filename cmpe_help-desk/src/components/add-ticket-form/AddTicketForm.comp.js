import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { createTicket } from './api';

export const AddTicketForm = ({}) => {
    console.log(frmDt)
    const [formData, setFormData] = useState({
        subject: "",
        date: "",
        detail: "",
        priority: "",
      });
    const [error, setError] = useState(null);

    const handleOnchange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleOnsubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.description || !formData.category) {
            setError('All fields are required.');
            return;
        }
        try {
            await createTicket({ title, description });
            navigate('/');
        } catch(err) {
            console.error(err)
            setError('Failed to submit ticket');
        }
      };

  return (
    <div className= "mt-2 add-new-ticket" class= "col-md-5 fs-5">
        <Form onSubmit={handleOnsubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm ={3}>Subject</Form.Label>
                    <Col sm={9}>
                        <Form.Control
                            name="subject"
                            value = {formData.subject}
                            onChange={handleOnchange}
                            required/>
                    </Col>
                </Form.Group>
                <Form.Group as ={Row}>
                    <Form.Label column sm={3}>Issue Date</Form.Label>
                    <Col sm= {9}>
                        <Form.Control
                            type="date"
                            value = {formData.date}
                            name="date"
                            onChange={handleOnchange }
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as ={Row}>
                    <Form.Label column sm={3}>Priority</Form.Label>
                    <Col sm= {9}>
                        <Form.Control
                            type="textarea"
                            value = {formData.priority}
                            name="priority"
                            onChange={handleOnchange }
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Details</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={formData.detail}
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
    formData: PropTypes.object.isRequired
}
