import React from 'react'
import { Navbar, Nav, NavbarBrand, NavbarCollapse, NavLink } from 'react-bootstrap'
import logo from "../../assets/img/ElizabethTT.png"
export const Header = () => {
  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="50px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
 
            <Nav.Link>Dashboard</Nav.Link>
 
            <Nav.Link>Tickets</Nav.Link>

          <Nav.Link>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
