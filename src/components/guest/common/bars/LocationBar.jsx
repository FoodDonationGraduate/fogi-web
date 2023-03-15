// Essentials
import { Button, Container, Col, Form, Nav, Navbar, Row } from 'react-bootstrap';

// Sources
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { FaMapMarkerAlt } from 'react-icons/fa';

// Styling
import 'assets/css/Fogi.css';

const LocationBar = () => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <Container className='py-3'>
        <h3>
          <FaMapMarkerAlt className='fogi me-4' style={{ color: '#82CD47' }} />
          227 Nguyen Van Cu, Ward 4, District 5
          <Button className='ms-4' variant='outline-secondary'>
            Change your location
          </Button>
        </h3>
      </Container>
    </div>
  );
};

export default LocationBar;
