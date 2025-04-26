import PropTypes from 'prop-types'
import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

export const SearchForm = ({handleOnchange, str}) => {

  return (
    <div>
    <Form>
        <Form.Group as = {Row}>
            <Form.Label column sm ="2">Search: {" "}</Form.Label>
            <Col sm="10">
                <Form.Control 
                name = "searchStr"
                onChange={handleOnchange}
                value = {str}
                placeholder='Search ...'/>
            </Col>
        </Form.Group>
    </Form>
    </div>
  )
}

SearchForm.propTypes ={
    handleOnchange: PropTypes.func.isRequired,
    str: PropTypes.string.isRequired
}