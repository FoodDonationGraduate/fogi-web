// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

// Assets imports
import { ReactComponent as Check } from 'assets/images/check-circle.svg';

// Style imports
import '../../../assets/css/Authentication.css';
import '../../../assets/css/Fogi.css';

const SuccessVerify = () => {
 
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-2'>
                  <Check fill='#82CD47' />
                </Row>
                <Row className='mb-2 text-center'>
                  <h4 className='fw-bold'>Verification Successful!</h4>
                  <p className='text-secondary'>
                    You have successfully verified your account
                  </p>
                </Row>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='fogi' variant='primary'>
                      Back to Home page
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

export default SuccessVerify;
