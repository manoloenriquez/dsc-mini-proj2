import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function Header(props) {
  return (
    <>
      <Navbar bg="light" expand="lg" sticky="top">
        <Link href="/" passHref>
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}