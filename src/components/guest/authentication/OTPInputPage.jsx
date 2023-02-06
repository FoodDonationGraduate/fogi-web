// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Form handling
import { useForm } from 'react-hook-form';

// Style imports
import './Authentication.css';
import '../../../assets/css/index.css';

const OTPInput = () => {
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    console.log('login');
  };

  return (
    <Container fluid className='authen-bg authen-bg-1'>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <div className='logo' />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Verification
                    </h2>
                    <p className='text-secondary mb-0'>
                      Enter the OTP code
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row lg={6}>
                      {Array.from({ length: 6 }).map((_) => (
                        <Col>
                          <Form.Group className='text-center mb-3'>
                            <Form.Control maxLength='1' />
                          </Form.Group>
                        </Col>
                      ))}
                    </Row>
                  </Form>
                </div>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='authen' variant='primary'>
                      Confirm
                    </Button>
                    <Button className='authen mt-2' variant='outline-dark'>
                      Resend OTP code
                    </Button>
                    <Button className='mt-2' variant='outline-secondary'>
                      Try another method
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

export default OTPInput;