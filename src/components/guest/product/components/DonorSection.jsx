// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';

// Sources
import { MdOutlineLocationOn } from 'react-icons/md';

// Styling
import 'assets/css/Fogi.css';

const ProductSection = ({donor}) => {
  return (
    <Container className='py-4'>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4} lg={4}>
                  <Stack direction='horizontal' gap={4}>
                    <img className='donor-logo-m' src={`https://bachkhoi.online/static/${donor.avatar_filename}`} alt='donor avatar'/>
                    <Stack direction='vertical' gap={1}>
                      <h4>{donor.name}</h4>
                      <Button variant='outline-dark'>Visit Donor</Button>
                    </Stack>
                  </Stack>
                </Col>
                <Col md={1} lg={1} />
                <Col className='mt-2'>
                  <div>
                    <header style={{ color: 'gray' }}>
                      <MdOutlineLocationOn className='me-2 mb-1' />
                      {donor.address}
                    </header>
                    {/* <header style={{ color: 'gray' }}>
                      <MdLinearScale className='me-2 mb-1' />
                      1.2 km away
                    </header>
                    <header style={{ color: 'gray' }}>
                      <MdOutlineAccessTime className='me-2 mb-1' />
                      09h00 - 21h00
                    </header> */}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSection;
