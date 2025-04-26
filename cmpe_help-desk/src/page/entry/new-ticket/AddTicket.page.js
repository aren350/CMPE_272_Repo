import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { PageBreadcrumb } from '../../../components/breadcrumb/Breadcrumb.comp'
import { AddTicketForm } from '../../../components/add-ticket-form/AddTicketForm.comp'

const initialFrmDt = {
    subject:"",
    issueDate:null,
    detail:""
}

export const AddTicket = () => {

    const [frmData, setFrmData] = useState(initialFrmDt)
    useEffect(() => {},[frmData])

    const handleOnchange = e =>{
        const {name, value} =e.target

        setFrmData({
            ...frmData,
            [name]: value,
        })
        console.log(name, value)
    }

    const handleOnsubmit =e =>{
        e.preventDefault()
        console.log("Form received")
    }

  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="New Ticket"/>
            </Col>
        </Row>
        <Row>
            <Col>
                <AddTicketForm 
                handleOnchange = {handleOnchange}
                handleOnsubmit={handleOnsubmit}
                frmDt = {frmData}/>
            </Col>
        </Row>
    </Container>
  )
}
