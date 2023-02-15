import {Container, Nav, Navbar, Button, Row, Col} from 'react-bootstrap';
import Logo from 'assets/images/Logo.png'
function TopBar() {
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
              <Col xs={12} md={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">About</Nav.Link>
              </Col>
              <Col xs={12} md={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">Pricing</Nav.Link>
              </Col>
              <Col xs={12} md={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">News</Nav.Link>
              </Col>
              <Col xs={12} md={4} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link d-md-none' href="">Login</Nav.Link>
              </Col>
              <Col xs={12} md={5} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link d-md-none' href="">Sign up</Nav.Link>
              </Col>
            </Row>
            <Nav className="nav-button-row d-none d-md-flex">
              <Button className='nav-button login-button' id="login-button"> Login</Button>
              <Button className='nav-button signup-button'  id="signup-button">Sign up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBar;