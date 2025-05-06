import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '../../../components/breadcrumb/Breadcrumb.comp'
import tickets from '../../../assets/data/dummytickets.json'
import { MessageHistory } from '../../../components/message-history/MessageHistory.comp'
import { UpdateTicket } from '../../../components/update_ticket/UpdateTicket.comp'

const ticket = tickets[0]
export const Ticket = () => {
    const [message, setMessage]= useState()

    useEffect(() => {} ,[message])

    const handleonChange = (e) => {
        setMessage(e.target.value)
    } 

    const handleonSubmit = () => {
        alert('Form Submitted')
    }
  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Ticket"/>
            </Col>
        </Row>
        <Row>
            <Col className='text-font-weight-bolder txt-secondary'>
                <div className='subject'>Subject: {ticket.subject}</div>
                <div className='openDate'>Open Date: {ticket.addedAt}</div>
                <div className='status'>Status: {ticket.status}</div>
            </Col>
            <Col className='text-right'>
                <Button variant="outline-info">Close Ticket</Button>
            </Col>
        </Row>
        <Row className='mt-4'>
            <Col>
                <MessageHistory msg={ticket.history}/>
            </Col>
        </Row>
        <hr/> 
        <Row>
                <UpdateTicket 
                msg = {message} 
                handleonChange={handleonChange}
                handleonSubmit = {handleonSubmit}
                />
                
        </Row>
    </Container>
  )
}
