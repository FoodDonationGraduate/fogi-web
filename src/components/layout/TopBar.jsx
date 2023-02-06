import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Logo from '../../assets/images/Logo.png'
import '../../assets/css/TopBar.css'
function CollapsibleExample() {
    return (
      <Navbar className='top-bar' collapseOnSelect expand="md" variant="dark">
        <Container className='mx-6'>
          <Navbar.Brand className='brand' href="#home">
            <img className='logo' src={Logo} ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-link-row col-12">
              <Nav.Link className='nav-link col-4' href="">About</Nav.Link>
              <Nav.Link className='nav-link col-4' href="">Pricing</Nav.Link>
              <Nav.Link className='nav-link col-4' href="">News</Nav.Link>
              <Nav.Link className='nav-link d-md-none' href="">Login</Nav.Link>
              <Nav.Link className='nav-link d-md-none' href="">Sign up</Nav.Link>
            </Nav>
            <Nav className="nav-button-row d-none d-md-flex">
              <Button className='nav-button login-button' id="login-button"> Login</Button>
              <Button className='nav-button signup-button'  id="signup-button">Sign up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default CollapsibleExample;