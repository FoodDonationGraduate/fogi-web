import {Container, Nav, Navbar, Button, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Logo from 'assets/images/Logo.png'
import 'assets/css/layout/TopBar.css'

function TopBar() {
  const navigate = useNavigate(); 
  const toLoginForm = () => { navigate('/login');}
  const toSignupForm = () => { navigate('/signup');}
  return (
    <div className='top-bar-header'>
      <Navbar className='top-bar' collapseOnSelect expand="md" variant="dark">
        <Container className='mx-6'>
          <Navbar.Brand className='brand px-2' href="#home">
            <img className='logo' src={Logo} alt='logo'></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Row className='w-100 d-flex justify-content-center'>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">About</Nav.Link>
              </Col>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">Pricing</Nav.Link>
              </Col>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">News</Nav.Link>
              </Col>
              <Col xs={12} md={3} lg={4} className='d-flex justify-content-center'>
                <Nav.Link href="/login" className='nav-link d-md-none' >Login</Nav.Link>
              </Col>
              <Col xs={12} md={3} lg={5} className='d-flex justify-content-center'>
                <Nav.Link href="/signup" className='nav-link d-md-none' >Sign up</Nav.Link>
              </Col>
            </Row>
            <Nav className="nav-button-row d-none d-md-flex">
              <Button onClick={toLoginForm} className='nav-button login-button' id="login-button"> Login</Button>
              <Button onClick={toSignupForm} className='nav-button signup-button'  id="signup-button">Sign up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBar;