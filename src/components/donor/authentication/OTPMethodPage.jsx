// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

// Style imports
import '../../../assets/css/Authentication.css';
import '../../../assets/css/Fogi.css';

const OTPMethod = () => {
 
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <div className='logo-donor' />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Verification
                    </h2>
                    <p className='text-secondary mb-0'>
                      Select a method to receive the OTP code
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='fogi' variant='primary'>
                      Get OTP by email
                    </Button>
                    <Button className='fogi mt-2' variant='primary'>
                      Get OTP by phone number
                    </Button>
                    <Button className='mt-2' variant='outline-secondary'>
                      Return
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OTPMethod;
