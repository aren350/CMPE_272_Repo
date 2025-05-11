import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '../../../components/breadcrumb/Breadcrumb.comp'
import tickets from '../../../assets/data/dummytickets.json'
import { MessageHistory } from '../../../components/message-history/MessageHistory.comp'
import { UpdateTicket } from '../../../components/update_ticket/UpdateTicket.comp'
import { useParams } from 'react-router-dom'

//const ticket = tickets[0]
export const Ticket = () => {
    const {tid} = useParams()
    const [message, setMessage]= useState()
    const [ticket, setTicket] = useState({})
    useEffect(() => {for (let i = 0; i < tickets.length; i++) {
        if(tickets[i].id == tid){
            setTicket(tickets[i])
            continue
        }
        
    }} ,[message,tid])

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
                <div className = 'ticketID'> <strong>Ticket ID: </strong> {tid} </div>
                <div className='subject'> <strong>Subject: </strong> {ticket.subject}</div>
                <div className='openDate'><strong>Open Date:  </strong> {ticket.addedAt}</div>
                <div className= 'category'> <strong>Category: </strong> {ticket.category}</div>
                <div className='status'><strong>Status: </strong> {ticket.status}</div>
            </Col>
            <Col className='text-right'>
                <Button variant="outline-info">Close Ticket</Button>
            </Col>
        </Row>
        {ticket && ticket.history && (
        <Row className='mt-4'>
            <Col>
                <MessageHistory msg={ticket.history}/>
            </Col>
        </Row>
        )}
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
