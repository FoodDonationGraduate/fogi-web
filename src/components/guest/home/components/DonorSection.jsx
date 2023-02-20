// Essentials
import * as React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Components
import DonorCard from 'components/guest/common/cards/DonorCard';

// Styling
import 'assets/css/Fogi.css';

// Data
import { DONOR_DATA } from 'utils/constants/Donor.jsx'

const ProductSection = () => {
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Donors</h2>
          </Col>
        </Row>
        <Row className='py-3' xs={2} md={3} lg={3} >
          {DONOR_DATA.map((donor) => (
            <Col>
              <DonorCard donor={donor} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='light'>View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductSection;
