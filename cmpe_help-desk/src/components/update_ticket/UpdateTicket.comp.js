import PropTypes from 'prop-types'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

export const UpdateTicket = ({msg, handleonChange, handleonSubmit}) => {
  return (
    <Form onSubmit={handleonSubmit}>
        <Form.Label>Reply</Form.Label>
        <Form.Control
        value = {msg}
        onChange={handleonChange}
        as= "textarea"
        row = "5"
        name ="detail"
        placeholder='Reply Here..'
        />
        <div className='text-right mt-3 mb-3'>
            <Button variant='info' type = "submit">
                Reply 
            </Button>
        </div>
    </Form>
  )
}

UpdateTicket.propTypes ={
    msg: PropTypes.string.isRequired,
    handleonChange: PropTypes.func.isRequired,
    handleonSubmit: PropTypes.func.isRequired,
}
