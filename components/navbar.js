import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export function UchiNavbar() {
  // <Nav className="me-auto">
  //   <Nav.Link href="#features">Dashboard</Nav.Link>
  //   <Nav.Link href="#pricing">Home Features</Nav.Link>
  //   <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
  //     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
  //     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
  //     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
  //     <NavDropdown.Divider />
  //     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
  //   </NavDropdown>
  // </Nav>
  return (
    <Navbar collapseOnSelect expand="lg" bg="#FFF8E6" variant="light">
      <Container>
      <Navbar.Brand href="#">UCHI</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="#">Dashboard</Nav.Link>
          <Nav.Link href="#">Home Features</Nav.Link>
          <Nav.Link href="#">Tasks</Nav.Link>
          <Nav.Link href="#">Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
