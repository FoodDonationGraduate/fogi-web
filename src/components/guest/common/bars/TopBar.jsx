// Essentials
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

// Sources
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { FaSearch } from 'react-icons/fa';

// Styling
import 'assets/css/Fogi.css';

const TopBar = () => {
  return (
    <>
      <Navbar className='fogi' variant='dark' expand='md'>
        <Container>
          <Navbar.Brand href='/'>
            <Logo fill='white' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarControl' />
          <Navbar.Collapse id='navbarControl'>
            <Nav className='me-auto'>
              <Nav.Link className='mx-2'>About</Nav.Link>
              <Nav.Link className='mx-2'>Donors</Nav.Link>
              <Nav.Link className='mx-2'>News</Nav.Link>
            </Nav>
            <Form className='d-flex me-4 my -2'>
              <Form.Control
                type='search'
                placeholder='Search for products'
                aria-label='Search'
              />
              <Button className='px-4 py-0' variant='dark'>
                <FaSearch />
              </Button>
            </Form>
            <Button className='me-2' variant='outline-light'>Login</Button>
            <Button variant='light'>Sign up</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
