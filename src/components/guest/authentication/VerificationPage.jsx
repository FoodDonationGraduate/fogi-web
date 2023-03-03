// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resendVerificationEmail } from 'components/redux/reducer/AuthenticationReducer';
// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';
// Components
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import Logo from 'components/common/Logo';

const Verification = () => {
  const registeredUser = useSelector(state => state.authenticationReducer.registeredUser)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toHomePage = () => {navigate('/');}
  const resendEmail = () => {
    if (registeredUser.email !== undefined) {
      dispatch(resendVerificationEmail({email: registeredUser.email}, navigate))
    } else {
      dispatch(setModalMessage('You need to register new account before verifying email!'))
      dispatch(showModal())
    }
  }
  
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

export default Verification;
