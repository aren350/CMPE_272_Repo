import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../assets/img/ElizabethTT.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth0();

  const logOut = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand>
        <img src={logo} alt="logo" width="50px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="ml-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {isAuthenticated && user && (
            <span style={{ color: "white", marginBottom: "0.5rem" }}>
              Welcome, {user.name}
            </span>
          )}
          <div style={{ display: "flex", gap: "1rem" }}>
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/tickets">
              Tickets
            </Nav.Link>
            {isAuthenticated && user && (
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
