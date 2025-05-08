import React from 'react'
import { Navbar, Nav, NavbarBrand, NavbarCollapse } from 'react-bootstrap'
import logo from "../../assets/img/ElizabethTT.png"
import {LinkContainer} from "react-router-bootstrap"
import { useNavigate, Link, useHistory } from 'react-router-dom'

export const Header = () => {

  const navigate = useNavigate()

  const logOut = () => 
    //REMOVE AUTH TOKEN HERE
    navigate("/")

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="50px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>

            <Nav.Link as={Link} to="/tickets">Tickets</Nav.Link>

            <Nav.Link onClick={logOut} >Logout</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

