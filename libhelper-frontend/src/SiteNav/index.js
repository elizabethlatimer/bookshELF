import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SiteNav({ isLoggedIn, logout }) {
  console.log(isLoggedIn)
  const loggedInNav = <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link eventKey="1" as={Link} to="/library">My Library</Nav.Link>
      <NavDropdown title="Account" id="basic-nav-dropdown">
        <NavDropdown.Item eventKey="2" as={Link} to="/profile">
          My Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="3" as={Link} to="#" onClick={logout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>;

  const loggedOutNav = <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link eventKey="1" as={Link} to="/signup">Login/Signup</Nav.Link>
    </Nav>
  </Navbar.Collapse>

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand><Link to="/">BookshELF</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {isLoggedIn ? loggedInNav : loggedOutNav}
    </Navbar>
  )

}

export default SiteNav;