// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

// Components
import Logo from 'components/common/Logo';
import Modal from 'components/layout/Modal'

const Verification = () => {

  const navigate = useNavigate();

  const toHomePage = () => {navigate('/');}
  const toLoginPage = () => {navigate('/login')}
  const resendEmail = () => {navigate('/verifyemail')}
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <Logo usertype={0} />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Verification
                    </h2>
                    <p className='text-secondary mb-0'>
                      Please check your email for verification
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <div className='d-grid'>
                    <Button className='mt-2' variant='outline-secondary' onClick={resendEmail}>
                      Resend verification email
                    </Button>
                    <Button className='fogi mt-2' variant='primary' onClick={toHomePage}>
                      Back to Home page
                    </Button>
                    <Button className='fogi mt-2' variant='primary' onClick={toLoginPage}>
                      Back to Login page
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default Verification;
